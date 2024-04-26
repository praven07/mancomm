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
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const datastore_1 = require("./datastore");
const document_parser_1 = require("./document_parser");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const html = yield api_1.Api.fetch();
        if (html) {
            const documentParser = new document_parser_1.DocumentParser();
            const structuredData = documentParser.parseHTML(html);
            datastore_1.DataStore.save(structuredData);
        }
    });
}
main();
