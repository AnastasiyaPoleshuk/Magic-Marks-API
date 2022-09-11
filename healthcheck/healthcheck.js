const constants = require('../utils/constants')

const getHealthStatus = (req) => {
  const port = getPort(req);

  const response = {
    Port: port,
    Application: constants.CONSTANTS.HEALTHCHECK.Application,
    Status: constants.CONSTANTS.HEALTHCHECK.Status
  }
  return response;
}

function getPort(req) {
  let hostArr = req.headers.host.split('');
  const port = hostArr.slice(-4);
  return port.join('');
}

module.exports = getHealthStatus;
