"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigSwagger = void 0;
const fs_1 = __importDefault(require("fs"));
class ConfigSwagger {
    constructor() {
        this.swaggerFile = (process.cwd() + "/src/infra/swagger/swagger.json");
        this.swaggerData = fs_1.default.readFileSync(this.swaggerFile, 'utf8');
        this.swaggerDocument = JSON.parse(this.swaggerData);
    }
}
exports.ConfigSwagger = ConfigSwagger;
