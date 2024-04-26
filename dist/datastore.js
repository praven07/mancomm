"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStore = void 0;
const fs_1 = require("fs");
const consts_1 = require("./consts");
class DataStore {
    static save(data) {
        (0, fs_1.writeFile)(consts_1.OUTPUT_FILE_PATH, JSON.stringify(data, null, 2), (error) => {
            if (error) {
                return console.error('An error occurred while writing JSON to file:', error);
            }
            console.log('Data is saved.');
        });
    }
}
exports.DataStore = DataStore;
