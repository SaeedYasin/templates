const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      extends: ["next", "babel/next", "prettier", "next/core-web-vitals"],
    };
  }

  return {
    extends: ["next", "prettier", "next/core-web-vitals"],
  };
};
