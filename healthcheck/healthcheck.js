const constants = require('../utils/constants')

const getHealthStatus = (req) => {
  const response = {
    Port: process.env.PORT,
    Application: constants.CONSTANTS.HEALTHCHECK.Application,
    Status: constants.CONSTANTS.HEALTHCHECK.Status
  }
  return response;
}

module.exports = getHealthStatus;
