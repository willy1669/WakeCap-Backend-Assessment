/* eslint-disable func-names */
const requestIp = require('request-ip');

const ipChecker = {
  /**
   * @method ipMiddleware
   * @description
   * @param {*} req
   * @param {*} res
   * @returns {object} encoded user token
   */
  ipMiddleware: (req, res) => {
    const clientIp = requestIp.getClientIp(req); // on localhost > 127.0.0.1
    return res.json({ clientIp });
  },
};
export default ipChecker;
