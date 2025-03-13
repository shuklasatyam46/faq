import dotenv from 'dotenv';
import {v2 as Translate} from '@google-cloud/translate';
import { fileURLToPath } from 'url';
import path from 'path';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const translationClient = new Translate.Translate({
    keyFilename: path.join(__dirname, '../google-credentials.json'),
});

const supportedLanguages = process.env.SupportedLanguages.split(',');

async function translateText(text, targetLanguage){
    try {
        const [translation] = await translationClient.translate(text, targetLanguage);
        return translation;
    } catch (error) {
        console.error(error);
        return text;
    }
}

export const translateFAQ = async (faq) => {
    const translations=[];
    for(const language of supportedLanguages){
        if(language!=process.env.DefaultLanguage){
        const translatedQuestion = await translateText(faq.question, language);
        const translatedAnswer = await translateText(faq.answer, language);
        translations.push({faqID: faq._id,languageCode:language,question:translatedQuestion,answer:translatedAnswer});
        }
    }
    return translations;
}
