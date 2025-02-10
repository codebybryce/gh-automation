import dotenv from 'dotenv/config'
import {getRegex , updateRegexAnswered} from './services/dbService.js'
import { generateRegex } from './services/openaiService.js';
import {appendRegexFile , handleCommit} from './services/repoUpdateService.js'
import dayjs from 'dayjs';
import { logger } from './services/loggerService.js';
import express from 'express'

function dailyRegex(){
    getRegex()
    .catch(err => logger(err))
    .then(res => {
        if(!res){
            return logger('No regex left to answer')
        }
        const {id,useCase} = res.rows[0];
        generateRegex(useCase).then(res => {
            appendRegexFile(res)
            .catch(err => console.error(err))
            .then(() => {
                handleCommit(useCase, dayjs().format()).catch(err => console.error(`${dayjs().format()}  ${err}`))
                updateRegexAnswered(id,true)
            })
        })
    })
}
dailyRegex()