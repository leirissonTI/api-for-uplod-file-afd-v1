"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHanding = errorHanding;
const app_erro_1 = require("../utils/app-erro");
function errorHanding(error, request, response, _) {
    if (error instanceof app_erro_1.AppError) {
        response.status(error.statusCode).json({ message: error.message });
        return;
    }
    response.status(500).json({ message: error.message });
}
