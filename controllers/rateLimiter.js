import { getredisClient } from "../service/connection.js";
import { config } from "dotenv";
config();

const internalScope = process.env.scope;
const tasks_per_second = 1;
const tasks_per_minute = 20;
export default async function rateLimiter(req,res,next){

    const { scope } =  req.query;
    if(scope === internalScope){
        next();
        return 
    }
    const client = await getredisClient();
    // Assuming this rateLimiter serving only for POST route
    const { user_id } = req.body
    const userSecondsKey = `seconds:${user_id}`;
    const userMinutesKey = `minutes:${user_id}`;
    const userSecondsQueueKey = `seconds:queue`;
    const userMinutesQueueKey = `minutes:queue`;

    const requestPerSecond = await client.incrBy(userSecondsKey,1);
    const requestPerMinute = await client.incrBy(userMinutesKey,1);
    if(requestPerSecond === 1 ){
        await client.expire(userSecondsKey,1);
    }
    if(requestPerMinute === 1){
        await client.expire(userMinutesKey,60);
    }
    if(requestPerSecond <= tasks_per_second && requestPerMinute <= tasks_per_minute){    
        // user is in Limits
        next();
    }else{
        if(requestPerSecond > 1){
            await client.rPush(userSecondsQueueKey , userSecondsKey);
        }else{
            await client.rPush(userMinutesQueueKey , userMinutesKey);
        }
        res.status(429).json({ message : "Too many requests ... Your requests are queued"})
        return;
    }
}