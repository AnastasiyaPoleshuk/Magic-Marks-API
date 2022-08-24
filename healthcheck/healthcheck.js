const constants = require('../utils/constants')

const getHealthStatus = () => {
  return constants.CONSTANTS.HEALTHCHECK;
}

module.exports = getHealthStatus;
