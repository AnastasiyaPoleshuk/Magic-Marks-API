const constants = require('../utils/constants')

const getHealthStatus = (req) => {
  const port = +req.headers.host.split(':')[1];
  const response = {
    Port: port,
    Application: constants.CONSTANTS.HEALTHCHECK.Application,
    Status: constants.CONSTANTS.HEALTHCHECK.Status
  }
  return response;
}

module.exports = getHealthStatus;
