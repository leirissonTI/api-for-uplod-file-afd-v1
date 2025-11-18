"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || 'localhost'; //'172.19.5.127'
app_1.app.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
