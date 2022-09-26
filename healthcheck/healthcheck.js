const constants = require('../utils/constants')

const getHealthStatus = () => {
  const response = {
    Port: process.env.PORT || constants.CONSTANTS.PORT,
    Application: constants.CONSTANTS.HEALTHCHECK.Application,
    Status: constants.CONSTANTS.HEALTHCHECK.Status
  }
  return response;
}

module.exports = getHealthStatus;
