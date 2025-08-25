// next.config.js (ESM)
// Keep your env import
import "./src/env.js";

// Add the next-intl plugin
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(); // looks for ./src/i18n/request.(ts|js)

/** @type {import("next").NextConfig} */
const config = {
  // your existing Next.js settings go here
};

export default withNextIntl(config);
