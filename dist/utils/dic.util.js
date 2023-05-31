"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importEnglishDataToDB = void 0;
const data_json_1 = __importDefault(require("../dic/data.json"));
const models_1 = require("../models");
const configs_1 = require("../configs");
function importEnglishDataToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = data_json_1.default.Sheet1[0];
        const dataAsArray = Object.entries(data);
        let wordCount = 0;
        configs_1.sys.log("--- IMPORTING DATA --- ");
        for (let i = 0; i < dataAsArray.length; ++i) {
            const word = dataAsArray[i];
            yield new models_1.WordSchema({
                engVer: word[0].toLowerCase(),
                vieVers: [word[1].toLowerCase()],
                creator: "SYSTEM",
                images: [],
                audios: [],
            }).save();
            wordCount++;
        }
        configs_1.sys.log("IMPORTED " + wordCount + "WORDS");
    });
}
exports.importEnglishDataToDB = importEnglishDataToDB;
