import 'dotenv/config'
import {getRegex , updateRegexAnswered} from '../services/dbService.js'
import { generateRegex } from '../services/openaiService.js';
import {appendRegexFile , handleCommit} from '../services/repoUpdateService.js'
import dayjs from 'dayjs';
import { logger } from '../services/loggerService.js';


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
            .then(response => {
                handleCommit(useCase, dayjs().format()).catch(err => console.error(`${dayjs().format()}  ${err}`))
                updateRegexAnswered(id,true)
            })
        })
    })
} 

// dailyRegex()
console.log("hello")