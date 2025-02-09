import dayjs from "dayjs";


export function logger(message){
    console.log(`${dayjs().format()} |  ${process.env.NODE_ENV} | ${message}`)
}