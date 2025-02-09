import { openai } from "../config/openaiConfig.js";
import dayjs from "dayjs";
/**
 * 
 * @param {string} useCase 
 * @returns 
 */
export const generateRegex = async (useCase) => {
    console.log(`${dayjs().format()}:   Generating regex pattern for useCase: ${useCase}`)
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: [
            {
                role: "user",
                content: `Write a one-line regex solution to ${useCase}. Structure the output as a new object to be added to an array of objects, where the key is a short identifier and the value is an object containing a description and a regex pattern. Format the output as { key: { description: "Description", regex: /pattern/ } }. Provide code only.`
            },
        ],
        store: true,
    });
    let { content } = completion.choices[0].message;
    console.log(`${dayjs().format()}:   ${content}`)
    return content.replace('```javascript\n', '').replace('```', '')
}