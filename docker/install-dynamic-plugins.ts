import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import tar from 'tar';
import yaml from 'js-yaml';

class InstallException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InstallException';
  }
}

interface Plugin {
  package: string;
  disabled?: boolean;
  integrity?: string;
  pluginConfig?: Record<string, unknown> | null;
}

interface Include {
  plugins: Plugin[];
}

interface DynamicPluginsConfig {
  includes?: string[];
  plugins?: Plugin[];
}

interface GlobalConfig {
  dynamicPlugins: {
    rootDirectory: string;
  };
}

function merge(
  source: Record<string, unknown>,
  destination: Record<string, unknown>,
  prefix = '',
): Record<string, unknown> {
  for (const [key, value] of Object.entries(source)) {
    if (typeof value === 'object' && value !== null) {
      // get node or create one
      const node = destination[key] ?? {};
      merge(
        value as Record<string, unknown>,
        node as Record<string, unknown>,
        `${key}.`,
      );
      destination[key] = node;
    } else {
      // if key exists in destination trigger an error
      if (key in destination && destination[key] !== value) {
        throw new InstallException(
          `Config key '${
            prefix + key
          }' defined differently for 2 dynamic plugins`,
        );
      }

      destination[key] = value;
    }
  }

  return destination;
}

const RECOGNIZED_ALGORITHMS = ['sha512', 'sha384', 'sha256'];

function verifyPackageIntegrity(
  plugin: Plugin,
  archive: string,
  workingDirectory: string,
): void {
  const package_ = plugin.package;
  if (!('integrity' in plugin)) {
    throw new InstallException(`Package integrity for ${package_} is missing`);
  }

  let integrity = plugin.integrity;
  if (typeof integrity !== 'string') {
    throw new InstallException(
      `Package integrity for ${package_} must be a string`,
    );
  }

  let integrityParts = integrity.split('-');
  if (integrityParts.length !== 2) {
    throw new InstallException(
      `Package integrity for ${package_} must be a string of the form <algorithm>-<hash>`,
    );
  }

  const algorithm = integrityParts[0];
  if (!RECOGNIZED_ALGORITHMS.includes(algorithm)) {
    throw new InstallException(
      `${package_}: Provided Package integrity algorithm ${algorithm} is not supported, please use one of following algorithms ${RECOGNIZED_ALGORITHMS} instead`,
    );
  }

  const hashDigest = integrityParts[1];
  try {
    Buffer.from(hashDigest, 'base64');
  } catch (error) {
    throw new InstallException(
      `${package_}: Provided Package integrity hash ${hashDigest} is not a valid base64 encoding`,
    );
  }

  const catProcess = execSync(`cat ${archive}`);
  const opensslDgstProcess = execSync(`openssl dgst -${algorithm} -binary`, {
    input: catProcess,
  });
  const opensslBase64Process = execSync('openssl base64 -A', {
    input: opensslDgstProcess,
  });

  const output = opensslBase64Process.toString().trim();
  if (hashDigest !== output) {
    throw new InstallException(
      `${package_}: The hash of the downloaded package ${output} does not match the provided integrity hash ${hashDigest} provided in the configuration file`,
    );
  }
}

async function main(): Promise<void> {
  const dynamicPluginsRoot = process.argv[2];
  const maxEntrySize = parseInt(process.env.MAX_ENTRY_SIZE || '20000000', 10);
  const skipIntegrityCheck =
    process.env.SKIP_INTEGRITY_CHECK?.toLowerCase() === 'true';

  const dynamicPluginsFile = 'dynamic-plugins.yaml';
  const dynamicPluginsGlobalConfigFile = path.join(
    dynamicPluginsRoot,
    'app-config.dynamic-plugins.yaml',
  );

  // test if file dynamic-plugins.yaml exists
  if (!fs.existsSync(dynamicPluginsFile)) {
    console.log(
      `No ${dynamicPluginsFile} file found. Skipping dynamic plugins installation.`,
    );
    fs.writeFileSync(dynamicPluginsGlobalConfigFile, '');
    return;
  }

  const globalConfig: GlobalConfig = {
    dynamicPlugins: {
      rootDirectory: 'dynamic-plugins-root',
    },
  };

  const content = yaml.load(fs.readFileSync(dynamicPluginsFile, 'utf8')) as
    | DynamicPluginsConfig
    | ''
    | undefined;

  if (content === '' || content === undefined) {
    console.log(
      `${dynamicPluginsFile} file is empty. Skipping dynamic plugins installation.`,
    );
    fs.writeFileSync(dynamicPluginsGlobalConfigFile, '');
    return;
  }

  if (typeof content !== 'object') {
    throw new InstallException(
      `${dynamicPluginsFile} content must be a YAML object`,
    );
  }

  const allPlugins: Record<string, Plugin> = {};

  if (skipIntegrityCheck) {
    console.log(
      `SKIP_INTEGRITY_CHECK has been set to ${skipIntegrityCheck}, skipping integrity check of packages`,
    );
  }

  const includes = content.includes ?? [];
  if (!Array.isArray(includes)) {
    throw new InstallException(
      `content of the 'includes' field must be a list in ${dynamicPluginsFile}`,
    );
  }

  for (const include of includes) {
    if (typeof include !== 'string') {
      throw new InstallException(
        `content of the 'includes' field must be a list of strings in ${dynamicPluginsFile}`,
      );
    }

    console.log(`\n======= Including dynamic plugins from ${include}`);

    if (!fs.existsSync(include)) {
      throw new InstallException(`File ${include} does not exist`);
    }

    const includeContent = yaml.load(fs.readFileSync(include, 'utf8'));

    if (typeof includeContent !== 'object') {
      throw new InstallException(`${include} content must be a YAML object`);
    }

    const includePlugins = (includeContent as Include).plugins;
    if (!Array.isArray(includePlugins)) {
      throw new InstallException(
        `content of the 'plugins' field must be a list in ${include}`,
      );
    }

    for (const plugin of includePlugins) {
      allPlugins[plugin.package] = plugin;
    }
  }

  const plugins = content.plugins ?? [];
  if (!Array.isArray(plugins)) {
    throw new InstallException(
      `content of the 'plugins' field must be a list in ${dynamicPluginsFile}`,
    );
  }

  for (const plugin of plugins) {
    const package_ = plugin.package;
    if (typeof package_ !== 'string') {
      throw new InstallException(
        `content of the 'plugins.package' field must be a string in ${dynamicPluginsFile}`,
      );
    }

    // if `package` already exists in `allPlugins`, then override its fields
    if (!(package_ in allPlugins)) {
      allPlugins[package_] = plugin;
      continue;
    }

    // override the included plugins with fields in the main plugins list
    console.log(
      `\n======= Overriding dynamic plugin configuration ${package_}`,
    );
    for (const [key, value] of Object.entries(plugin)) {
      if (key === 'package') {
        continue;
      }
      allPlugins[package_][key] = value;
    }
  }

  // iterate through the list of plugins
  for (const plugin of Object.values(allPlugins)) {
    const package_ = plugin.package;

    if ('disabled' in plugin && plugin.disabled === true) {
      console.log(`\n======= Skipping disabled dynamic plugin ${package_}`);
      continue;
    }

    console.log(`\n======= Installing dynamic plugin ${package_}`);

    const packageIsLocal = package_.startsWith('./');

    // If package is not local, then integrity check is mandatory
    if (!packageIsLocal && !skipIntegrityCheck && !('integrity' in plugin)) {
      throw new InstallException(
        `No integrity hash provided for Package ${package_}`,
      );
    }

    let packagePath = package_;
    if (packageIsLocal) {
      packagePath = path.join(process.cwd(), package_.slice(2));
    }

    console.log('\t==> Grabbing package archive through `npm pack`');
    const completed = execSync(`npm pack ${packagePath}`, {
      cwd: dynamicPluginsRoot,
    });
    if (completed.status !== 0) {
      throw new InstallException(
        `Error while installing plugin ${package_} with 'npm pack': ${completed.stderr
          .toString()
          .trim()}`,
      );
    }

    const archive = path.join(
      dynamicPluginsRoot,
      completed.stdout.toString().trim(),
    );

    if (!packageIsLocal && !skipIntegrityCheck) {
      console.log('\t==> Verifying package integrity');
      verifyPackageIntegrity(plugin, archive, dynamicPluginsRoot);
    }

    const directory = archive.replace('.tgz', '');
    const directoryRealpath = fs.realpathSync(directory);

    console.log(`\t==> Removing previous plugin directory ${directory}`);
    fs.rmdirSync(directory, { recursive: true });
    fs.mkdirSync(directory);

    console.log(`\t==> Extracting package archive ${archive}`);
    await tar.extract({
      file: archive,
      cwd: directory,
      filter: (path, entry) => {
        if (!entry.name.startsWith('package/')) {
          throw new InstallException(
            `NPM package archive archive does not start with 'package/' as it should: ${entry.name}`,
          );
        }

        if (entry.size > maxEntrySize) {
          throw new InstallException(`Zip bomb detected in ${entry.name}`);
        }

        entry.name = entry.name.slice(8);
        return true;
      },
    });

    console.log(`\t==> Removing package archive ${archive}`);
    fs.unlinkSync(archive);

    if ('pluginConfig' in plugin) {
      console.log('\t==> Merging plugin-specific configuration');
      const config = plugin.pluginConfig;
      if (config !== null && typeof config === 'object') {
        merge(config, globalConfig);
      }
    }

    console.log(`\t==> Successfully installed dynamic plugin ${package_}`);
  }

  fs.writeFileSync(dynamicPluginsGlobalConfigFile, yaml.dump(globalConfig));
}

main().catch(error => {
  if (error instanceof InstallException) {
    console.error(`Error: ${error.message}`);
  } else {
    console.error(error);
  }
  process.exit(1);
});
