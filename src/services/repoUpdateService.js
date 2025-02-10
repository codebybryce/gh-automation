
import fs from 'node:fs';
import path from 'node:path';
import { git } from '../config/gitConfig.js';

import 'dotenv/config';

export async function appendRegexFile(message) {
    const repoPath = path.resolve(process.env.REGEX_FILE_UPDATE_PATH)
    const fileName = 'regex-util.js'
    let ok = false;
    try {
        fs.appendFileSync(path.join(repoPath, fileName), message)
        ok = true;
        message = "Regex file updated successfully!"
    } catch (error) {
        ok = false;
        message = error
        throw new Error(error)
    }
    return {
        ok, message
    }
}
/**
 * 
 * @param {string} message 
 * @param {string} time 
 */
export async function handleCommit(message, time) {
    git.pull('origin', 'main')
    .add('.')
    .commit(`Daily Update - ${message}`, { "--date": time }, (error => error && console.error(error)))
    .push('origin', 'main', (error) => error && console.error(error))
}