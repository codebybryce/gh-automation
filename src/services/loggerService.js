import dayjs from "dayjs";


export function logger(message){
    console.log(`${dayjs().format()} ${message}`)
}