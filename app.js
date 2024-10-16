import cluster from "node:cluster"
import process from "node:process"
import express from "express"
import cors from "cors"
import { config } from "dotenv";
import taskRouter from "./controllers/taskRouter.js"
import rateLimiter from "./controllers/rateLimiter.js"
import startScheduler from "./service/scheduler.js";
import log from "./util/logger.js"
import { getredisClient } from "./service/connection.js";
config()

const workers = 2;
const port = process.env.PORT || 3500;

if(cluster.isPrimary){
    // Master
    for(let i=0;i<workers;i++){
        cluster.fork();
    }

    cluster.on('exit',async (worker, code, signal) => {
        log.Info(`Worker process ${worker.process.pid} died`);
        const client = await getredisClient()
        client.flushAll()
    })

}else{
    // workers
    const app = express()

    app.use(express.json())
    app.use(cors({
        origin: '*', 
        methods: ['GET', 'POST', 'PUT', 'DELETE'], 
        allowedHeaders: ['Content-Type', 'Authorization'] 
      }));
    
    startScheduler()

    app.use("/api/v1/",rateLimiter,taskRouter)
    
    app.listen(port, () => {
        log.Info(`Worker process ${process.pid} is listening on port ${port}`);
        console.log(`Worker process ${process.pid} is listening on port ${port}`);
    });
}