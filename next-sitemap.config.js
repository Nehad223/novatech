/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://novatech-1tne.vercel.app",
  generateRobotsTxt: true,
    output: "public",
  exclude: [
    "/admin*",
    "/admin/*",
    "/logout",
    "/upload"
  ],
};
