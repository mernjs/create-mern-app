const withPWA = require("next-pwa");

console.log('process.env.NODE_ENV', process.env)

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});