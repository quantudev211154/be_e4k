"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerUI = __importStar(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const _1 = require(".");
function default_1(app) {
    const serverPort = process.env.PORT || process.env.API_PORT;
    const host = process.env.URL || process.env.BASE_URL;
    const swaggerOptions = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "E4K API Documentation",
                version: "1.0.0",
                description: "API Documentation of English For Kids project of Q.Tu and C.Hieu",
            },
            servers: [
                {
                    url: `${host}:${serverPort}/api`,
                },
            ],
        },
        apis: ["src/routes/*.route.ts"],
    };
    const specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
    _1.sys.log(`API Docs has already on ${host}:${serverPort}/api-docs`);
}
exports.default = default_1;
