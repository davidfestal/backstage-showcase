---
'dynamic-plugins-imports': patch
---

Some `yarn.lock` files (the ones in the imported backend dynamic plugins `dist-dynamic` sub-folders) were missed by the cachito replacement that occurs during the downstream docker build.
