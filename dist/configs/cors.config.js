"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
function default_1(app) {
    const corsConfig = {
        credentials: true,
        origin: function (origin, callback) {
            var _a;
            if (((_a = process.env.WHITE_LIST) === null || _a === void 0 ? void 0 : _a.indexOf(origin)) !== -1 || !origin) {
                callback(null, true);
            }
            else {
                callback(new Error("Now allowed by CORS"));
            }
        },
    };
    app.use((0, cors_1.default)(corsConfig));
}
exports.default = default_1;
