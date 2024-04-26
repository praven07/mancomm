import { writeFile } from 'fs';
import { OUTPUT_FILE_PATH } from './consts';

export class DataStore {

    public static save(data: Array<any>) {
        writeFile(OUTPUT_FILE_PATH, JSON.stringify(data, null, 2), (error) => {
            if (error) {
              return console.error('An error occurred while writing JSON to file:', error);
            }
            console.log('Data is saved.');
          });
    }
}