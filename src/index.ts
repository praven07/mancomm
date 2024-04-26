import { Api } from "./api";
import { DataStore } from "./datastore";
import { DocumentParser } from "./document_parser";



async function main(): Promise<void> {
    
    const html = await Api.fetch();
    
    if (html) {
        
        const documentParser = new DocumentParser();
        const structuredData = documentParser.parseHTML(html);

        DataStore.save(structuredData);

    }
}


main();