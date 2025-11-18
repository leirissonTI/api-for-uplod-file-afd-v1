"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (response, payload) => {
    return response.status(payload.statusCode).json({
        success: payload.success,
        message: payload.message,
        data: payload.data,
        error: payload.error,
    });
};
exports.sendResponse = sendResponse;
