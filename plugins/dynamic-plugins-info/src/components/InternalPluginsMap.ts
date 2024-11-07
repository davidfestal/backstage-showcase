import { DynamicPluginInfo } from '../api/types';

// This is a mapping of internal plugins to their package path based off dynamic-plugins.default.yaml
export const InternalPluginsMap: Record<string, string> = {
  'backstage-plugin-scaffolder-backend-module-github-dynamic':
    './dynamic-plugins/dist/backstage-plugin-scaffolder-backend-module-github-dynamic',
  'backstage-plugin-catalog-backend-module-github-dynamic':
    './dynamic-plugins/dist/backstage-plugin-catalog-backend-module-github-dynamic',
  'backstage-plugin-catalog-backend-module-github-org-dynamic':
    './dynamic-plugins/dist/backstage-plugin-catalog-backend-module-github-org-dynamic',
  'backstage-community-plugin-github-actions':
    './dynamic-plugins/dist/backstage-community-plugin-github-actions',
  'backstage-community-plugin-github-issues':
    './dynamic-plugins/dist/backstage-community-plugin-github-issues',
  'roadiehq-backstage-plugin-github-insights':
    './dynamic-plugins/dist/roadiehq-backstage-plugin-github-insights',
  'roadiehq-backstage-plugin-github-pull-requests':
    './dynamic-plugins/dist/roadiehq-backstage-plugin-github-pull-requests',
  'roadiehq-backstage-plugin-security-insights':
    './dynamic-plugins/dist/roadiehq-backstage-plugin-security-insights',
  'backstage-plugin-scaffolder-backend-module-gitlab-dynamic':
    './dynamic-plugins/dist/backstage-plugin-scaffolder-backend-module-gitlab-dynamic',
  'backstage-plugin-kubernetes-backend-dynamic':
    './dynamic-plugins/dist/backstage-plugin-kubernetes-backend-dynamic',
  'backstage-plugin-kubernetes':
    './dynamic-plugins/dist/backstage-plugin-kubernetes',
  'janus-idp-backstage-plugin-topology':
    './dynamic-plugins/dist/janus-idp-backstage-plugin-topology',
  'roadiehq-scaffolder-backend-argocd-dynamic':
    './dynamic-plugins/dist/roadiehq-scaffolder-backend-argocd-dynamic',
  'roadiehq-backstage-plugin-argo-cd':
    './dynamic-plugins/dist/roadiehq-backstage-plugin-argo-cd',
  'roadiehq-backstage-plugin-argo-cd-backend-dynamic':
    './dynamic-plugins/dist/roadiehq-backstage-plugin-argo-cd-backend-dynamic',
  'backstage-plugin-scaffolder-backend-module-azure-dynamic':
    './dynamic-plugins/dist/backstage-plugin-scaffolder-backend-module-azure-dynamic',
  'backstage-community-plugin-azure-devops-backend-dynamic':
    './dynamic-plugins/dist/backstage-community-plugin-azure-devops-backend-dynamic',
  'backstage-community-plugin-azure-devops':
    './dynamic-plugins/dist/backstage-community-plugin-azure-devops',
  'backstage-community-plugin-jenkins-backend-dynamic':
    './dynamic-plugins/dist/backstage-community-plugin-jenkins-backend-dynamic',
  'backstage-community-plugin-jenkins':
    './dynamic-plugins/dist/backstage-community-plugin-jenkins',
  'backstage-community-plugin-sonarqube-backend-dynamic':
    './dynamic-plugins/dist/backstage-community-plugin-sonarqube-backend-dynamic',
  'backstage-community-plugin-sonarqube':
    './dynamic-plugins/dist/backstage-community-plugin-sonarqube',
  'janus-idp-backstage-plugin-ocm-backend-dynamic':
    './dynamic-plugins/dist/janus-idp-backstage-plugin-ocm-backend-dynamic',
  'janus-idp-backstage-plugin-ocm':
    './dynamic-plugins/dist/janus-idp-backstage-plugin-ocm',
  'janus-idp-backstage-plugin-bulk-import-backend-dynamic':
    './dynamic-plugins/dist/janus-idp-backstage-plugin-bulk-import-backend-dynamic',
  'janus-idp-backstage-plugin-bulk-import':
    './dynamic-plugins/dist/janus-idp-backstage-plugin-bulk-import',
  'backstage-plugin-techdocs-backend-dynamic':
    './dynamic-plugins/dist/backstage-plugin-techdocs-backend-dynamic',
  'backstage-plugin-techdocs':
    './dynamic-plugins/dist/backstage-plugin-techdocs',
  'backstage-plugin-scaffolder-backend-module-gerrit-dynamic':
    './dynamic-plugins/dist/backstage-plugin-scaffolder-backend-module-gerrit-dynamic',
  'roadiehq-scaffolder-backend-module-utils-dynamic':
    './dynamic-plugins/dist/roadiehq-scaffolder-backend-module-utils-dynamic',
  'roadiehq-scaffolder-backend-module-http-request-dynamic':
    './dynamic-plugins/dist/roadiehq-scaffolder-backend-module-http-request-dynamic',
  'janus-idp-backstage-scaffolder-backend-module-quay-dynamic':
    './dynamic-plugins/dist/janus-idp-backstage-scaffolder-backend-module-quay-dynamic',
  'janus-idp-backstage-scaffolder-backend-module-regex-dynamic':
    './dynamic-plugins/dist/janus-idp-backstage-scaffolder-backend-module-regex-dynamic',
  'janus-idp-backstage-plugin-rbac':
    './dynamic-plugins/dist/janus-idp-backstage-plugin-rbac',
  'backstage-community-plugin-scaffolder-backend-module-servicenow-dynamic':
    './dynamic-plugins/dist/backstage-community-plugin-scaffolder-backend-module-servicenow-dynamic',
  'backstage-community-scaffolder-backend-module-sonarqube-dynamic':
    '/dynamic-plugins/dist/backstage-community-scaffolder-backend-module-sonarqube-dynamic',
  'janus-idp-backstage-plugin-aap-backend-dynamic':
    './dynamic-plugins/dist/janus-idp-backstage-plugin-aap-backend-dynamic',
  'backstage-community-plugin-3scale-backend-dynamic':
    './dynamic-plugins/dist/backstage-community-plugin-3scale-backend-dynamic',
  'backstage-community-plugin-catalog-backend-module-keycloak-dynamic':
    './dynamic-plugins/dist/backstage-community-plugin-catalog-backend-module-keycloak-dynamic',
  'backstage-community-plugin-redhat-argocd':
    './dynamic-plugins/dist/backstage-community-plugin-redhat-argocd',
  'backstage-plugin-scaffolder-backend-module-bitbucket-cloud-dynamic':
    './dynamic-plugins/dist/backstage-plugin-scaffolder-backend-module-bitbucket-cloud-dynamic',
  'backstage-plugin-catalog-backend-module-bitbucket-cloud-dynamic':
    './dynamic-plugins/dist/backstage-plugin-catalog-backend-module-bitbucket-cloud-dynamic',
  'backstage-plugin-scaffolder-backend-module-bitbucket-server-dynamic':
    './dynamic-plugins/dist/backstage-plugin-scaffolder-backend-module-bitbucket-server-dynamic',
  'backstage-plugin-catalog-backend-module-bitbucket-server-dynamic':
    './dynamic-plugins/dist/backstage-plugin-catalog-backend-module-bitbucket-server-dynamic',
  'backstage-community-plugin-dynatrace':
    './dynamic-plugins/dist/backstage-community-plugin-dynatrace',
  'roadiehq-backstage-plugin-jira':
    './dynamic-plugins/dist/roadiehq-backstage-plugin-jira',
  'roadiehq-backstage-plugin-datadog':
    './dynamic-plugins/dist/roadiehq-backstage-plugin-datadog',
  'janus-idp-backstage-plugin-tekton':
    './dynamic-plugins/dist/janus-idp-backstage-plugin-tekton',
  'janus-idp-backstage-plugin-quay':
    './dynamic-plugins/dist/janus-idp-backstage-plugin-quay',
  'backstage-community-plugin-nexus-repository-manager':
    './dynamic-plugins/dist/backstage-community-plugin-nexus-repository-manager',
  'backstage-community-plugin-acr':
    './dynamic-plugins/dist/backstage-community-plugin-acr',
  'backstage-community-plugin-jfrog-artifactory':
    './dynamic-plugins/dist/backstage-community-plugin-jfrog-artifactory',
  'pagerduty-backstage-plugin':
    './dynamic-plugins/dist/pagerduty-backstage-plugin',
  'pagerduty-backstage-plugin-backend-dynamic':
    './dynamic-plugins/dist/pagerduty-backstage-plugin-backend-dynamic',
  'backstage-community-plugin-lighthouse':
    './dynamic-plugins/dist/backstage-community-plugin-lighthouse',
  'backstage-community-plugin-tech-radar':
    './dynamic-plugins/dist/backstage-community-plugin-tech-radar',
  'backstage-community-plugin-tech-radar-backend-dynamic':
    './dynamic-plugins/dist/backstage-community-plugin-tech-radar-backend-dynamic',
  'janus-idp-backstage-plugin-analytics-provider-segment':
    './dynamic-plugins/dist/janus-idp-backstage-plugin-analytics-provider-segment',
  'parfuemerie-douglas-scaffolder-backend-module-azure-repositories-dynamic':
    './dynamic-plugins/dist/parfuemerie-douglas-scaffolder-backend-module-azure-repositories-dynamic',
  'immobiliarelabs-backstage-plugin-gitlab-backend-dynamic':
    './dynamic-plugins/dist/immobiliarelabs-backstage-plugin-gitlab-backend-dynamic',
  'backstage-community-plugin-catalog-backend-module-pingidentity-dynamic':
    './dynamic-plugins/dist/backstage-community-plugin-catalog-backend-module-pingidentity-dynamic',
  'backstage-community-plugin-catalog-backend-module-scaffolder-relation-processor-dynamic':
    './dynamic-plugins/dist/backstage-community-plugin-catalog-backend-module-scaffolder-relation-processor-dynamic',
  'backstage-plugin-catalog-backend-module-gitlab-dynamic':
    './dynamic-plugins/dist/backstage-plugin-catalog-backend-module-gitlab-dynamic',
  'backstage-plugin-catalog-backend-module-gitlab-org-dynamic':
    './dynamic-plugins/dist/backstage-plugin-catalog-backend-module-gitlab-org-dynamic',
  'backstage-plugin-catalog-backend-module-ldap-dynamic':
    './dynamic-plugins/dist/backstage-plugin-catalog-backend-module-ldap-dynamic',
  'backstage-plugin-catalog-backend-module-msgraph-dynamic':
    './dynamic-plugins/dist/backstage-plugin-catalog-backend-module-msgraph-dynamic',
};

export const getNotEnabledInternalPlugins = (enabledPlugins: string[]) => {
  const plugins: DynamicPluginInfo[] = [];
  if (!enabledPlugins || enabledPlugins?.length === 0) return [];
  Object.keys(InternalPluginsMap).forEach(internalPlugin => {
    if (!enabledPlugins.includes(internalPlugin)) {
      plugins.push({
        name: internalPlugin,
        version: '',
        internal: true,
        enabled: false,
        role: '',
        platform: '',
      });
    }
  });
  return plugins;
};