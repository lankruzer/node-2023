import fs from 'fs';
import os from 'os';
import childProcess from'child_process';

import {PROCESS_COMMAND_BY_OS, UPDATE_CONSOLE_PERIOD_MS, UPDATE_FILE_PERIOD_MS} from './cosntants.js';

const osPlatform = os.platform();
const processCommand = osPlatform === 'win32' ? PROCESS_COMMAND_BY_OS.windows : PROCESS_COMMAND_BY_OS.unix;


const writeLogIntoFile = (log) => {
    fs.appendFile('activityMonitor.log', log, (error) => {
        if (error) {
            console.error(`Error during write into the log file: ${error}`);
        }
    });
};

let lastLogFileUpdateAt;

const activityMonitor = () => {

    const handleCommandResult = (error, stdout, stderr) => {
        console.clear();

        const currentTimestamp = Date.now();
        let result;

        if (error !== null) {
            result = `${currentTimestamp}: error - ${error} | ${stderr}`;
        } else {
            result =`${currentTimestamp}: ${stdout}`;
            setTimeout(activityMonitor, UPDATE_CONSOLE_PERIOD_MS);
        }

        console.log(result);

        if (!lastLogFileUpdateAt || currentTimestamp - lastLogFileUpdateAt > UPDATE_FILE_PERIOD_MS) {
            lastLogFileUpdateAt = currentTimestamp;

            writeLogIntoFile(result);
        }
    };

    childProcess.exec(processCommand, handleCommandResult);
}

setTimeout(activityMonitor, UPDATE_CONSOLE_PERIOD_MS);

