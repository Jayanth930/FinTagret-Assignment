import { createClient } from "redis";
import log from "../util/logger.js";


let client;

export async function getredisClient(){
    if(!client){
        client = new createClient()
        try {
            await client.connect()
            log.Info("redis client connected")
            console.log("redis client connected")
        } catch (error) {
            log.Error("Problem with redis connection","redis","",error.message)
            console.log(`Error connecting to redis ${error.message}`)
            process.exit(1);
        }
    }
    return client;
}