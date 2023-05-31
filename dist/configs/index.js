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
exports.swaggerConfig = exports.dbConfigAndConnect = exports.routesConfig = exports.corsConfig = exports.sys = void 0;
const sys = __importStar(require("./sys.config"));
exports.sys = sys;
var cors_config_1 = require("./cors.config");
Object.defineProperty(exports, "corsConfig", { enumerable: true, get: function () { return __importDefault(cors_config_1).default; } });
var routes_config_1 = require("./routes.config");
Object.defineProperty(exports, "routesConfig", { enumerable: true, get: function () { return __importDefault(routes_config_1).default; } });
var db_config_1 = require("./db.config");
Object.defineProperty(exports, "dbConfigAndConnect", { enumerable: true, get: function () { return __importDefault(db_config_1).default; } });
var swagger_config_1 = require("./swagger.config");
Object.defineProperty(exports, "swaggerConfig", { enumerable: true, get: function () { return __importDefault(swagger_config_1).default; } });
