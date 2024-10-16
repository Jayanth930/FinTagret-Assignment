import log from "../util/logger.js"

export async function completeTask(req,res,next) {
    const { user_id } = req.body
    try {
        return res.status(200).json({ responseCode : 1 , message : "Successfully competed task"});
    } catch (err) {
        log.Error("Something went wrong","completeTask","POST",err.message);
        return res.status(500).json({ responseCode : 0 , message : "Unabe to process Task"})
    }
}