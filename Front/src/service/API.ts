import { config } from "dotenv";
config();

export default class API {

    static getUrl() {
        return process.env.API_URL;
    }
}