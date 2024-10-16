import { getredisClient } from "./connection.js";
import log from "../util/logger.js"
import axios from "axios";
import { config } from "dotenv";
config();


const userSecondsQueueKey = `seconds:queue`;
const userMinutesQueueKey = `minutes:queue`;

const scope = process.env.scope;
const port = process.env.PORT
async function processQueue(queueKey) {
    const client = await getredisClient();
    const users = await client.lRange(queueKey, 0,-1);
    if(!users || users.length <= 0) return;
    console.log(process.pid,queueKey,users.length);
    for(const user of users){
        const user_id = user.split(":")[1] // passed user_id
        try {
            const { data } = await axios.post(`http://localhost:${port}/api/v1/task?scope=${scope}`,{ user_id })
            if(data.responseCode === 1){
                log.Info(`Internal Call for user from queue :${queueKey}: ${user_id} successful`)
            }else{
                log.Error(`Internal Call for user : ${user_id} unsuccessful`);
            }
        } catch (error) {
            log.Error("Error in internal call","processQueue","POST",error.message);
        }
    }
    await client.del(queueKey);
}


export default function startScheduler(){
    setInterval(async ()=>{
        processQueue(userSecondsQueueKey)
    },1000);
    
    
    setInterval(async ()=>{
        processQueue(userMinutesQueueKey);
    },60000);
}


