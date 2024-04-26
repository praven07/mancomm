"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToFile = void 0;
const fs_1 = require("fs");
function writeToFile(path, data) {
    (0, fs_1.writeFile)(path, JSON.stringify(data, null, 2), (error) => {
        if (error) {
            return console.error('An error occurred while writing JSON to file:', error);
        }
        console.log('Data is saved.');
    });
}
exports.writeToFile = writeToFile;
