import log from "node-file-logger"

const options = {
    folderPath: './logs/',
    dateBasedFileNaming: true,
    fileNamePrefix: 'DailyLogs_',
    fileNameExtension: '.log',    
    dateFormat: 'DD_MM_YYYY',
    timeFormat: 'h:mm:ss A',
}


log.SetUserOptions(options); 

export default log;

