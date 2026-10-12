import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Serve pre-rendered /tools/[slug] pages from Worker static assets.
// OpenNext preview/deploy must populate the cache during deployment.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
