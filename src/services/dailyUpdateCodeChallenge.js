import {deleteQuestion,getQuestions,updateQuestion, getRegex} from '../services/db.js'

import OpenAI from "openai";
import path from 'node:path';
import fs from 'node:fs';
import { exec } from 'child_process'
import simpleGit from 'simple-git';
import dayjs from 'dayjs'
import { error } from "node:console";

import 'dotenv/config'

const git = simpleGit(path.resolve())

export async function appendRegexFile(message) {
    const repoPath = path.resolve('./regex-code')
    const fileName = 'regex-util.js'
    fs.appendFileSync(path.join(repoPath, fileName), message);
}

// async function processItem(item, index) {
//     const dailyRegex = await generateRegex(item);
//     console.log(`${dayjs().format()}    processingItem: ${item} at index ${index}`)
//     appendRegexFile(dailyRegex);
// }

function delay(minutes) {
    const ms = minutes * 6000;
    return new Promise(resolve => setTimeout(resolve, ms))
}

function handleCommit(message, time){
    git.add('.')
    .commit(`Daily Update - ${message}`,{"--date":time},(error => error && console.error(error)))
    .push('origin', 'main', (error)=>error && console.error(error))
}

async function processWithDelay(arr, delayTimeMinutes) {
    for (let itemIndex = arr.length; itemIndex > 0; itemIndex--) {
        processItem(arr[itemIndex], itemIndex);
        let ghDay = dayjs().subtract(itemIndex,'day').format();
        handleCommit(arr[itemIndex],ghDay)
        await delay(delayTimeMinutes)
    }
}


