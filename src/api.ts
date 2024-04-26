import axios from "axios";
import { API_URL } from "./consts";

export class Api {

    /**
     * Fetches content from the given url.
     * @param url 
     * @returns string
     */
    static async fetch(): Promise<string|null> {
        try {
            const response = await axios.get<string>(API_URL);
            console.log('Successfully fetched data');
            return response.data;
        } catch (error: any) {
            console.error('Error fetching HTML:', error);
            return null;
        }
    }
}