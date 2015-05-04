'use strict';

//var ApiError = require('./ApiError');
//var logger   = require('winston');

/**
 * @name middleware
 * @function
 *
 * @description
 * middleware to exposes a 'promise' function on express' response object that accepts a q's promise and, once resolved,
 * gets returned in a restful manner.
 *
 *
 * @param {req} req express' req object.
 * @param {res} res express' res object..
 * @param {Function} next express' next().
 * @returns {promise} q promise, resolved when an sms has been sent.
 */
function middleware(req, res, next) {

    res.promise = function(promise) {
        promise
            .then(function (data) {
                res.json(success({payload: data}));
            })
            .catch(function (error) {
                if (!error.code || isNaN(error.code) || error.code >= 10000) { // For mongoose errors
                    error.code = 503;
                }
                error.msg = error.message || error.msg || 'Internal server error';
                try {
                    res.json(error.code || 503, failure(error));
                } catch (err) {
                }
            });
    };

    //TODO enhance with express-validator
    //req.onValidationError(function(error) {
    //    throw new ApiError(error.code, error.msg);
    //});

    return next();
}

/**
 * @name success
 * @function
 *
 * @description
 * builds a restful object out of raw data.
 *
 * @param {{code: number=, msg: string=, payload: object}} oData
 * @returns {Object} a restful formatted object.
 */
function success(oData) {
    return build(oData.code || 200, oData.msg || 'OK', oData.payload);

}

/**
 * @name failure
 * @function
 *
 * @description
 * builds a restful object out of an error.
 *
 * @param {Error} error error object.
 * @returns {Object} a restful formatted object.
 */
function failure(error) {
    return build(error.code, error.msg, null);
}

/**
 * @name build
 * @function
 *
 * @description
 * formats an object as in a restful format.
 *
 * @param {number} code http code.
 * @param {string} message message.
 * @param {Object} payload the data being displayed.
 * @returns {Object} a restful formatted object.
 */
function build(code, message, payload) {
    return {
        code: code,
        message: message,
        payload: payload
    };
}

module.exports = middleware;
