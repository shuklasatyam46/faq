import FAQ from '../models/faq.model.js';
import translation from '../models/translation.model.js';
import Translation from '../models/translation.model.js';
import { translateFAQ } from '../utils/gtranslator.js';
import {createClient} from 'redis';


/*const redisClient = createClient();
redisClient.connect();*/

export const getFAQ = async (req, res) => {
    try {
        const {lang}=req.query;

        /*const cacheKey = lang ? `faq:${lang}` : 'faq:all';

        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log("Serving from cache");
            return res.status(200).json(JSON.parse(cachedData));
        }*/

        let faq;
        if(lang && lang!=="en"){
            faq = await Translation.find({languageCode:lang}).populate("faqID");
            if(faq.length===0){
                faq=await FAQ.find({languageCode:"en"});
                res.status(200).json({"message":"could not find translations",faq});
            }
            res.status(200).json(faq);
        }
        else{
            faq = await FAQ.find().populate("translation");
            res.status(200).json(faq);
        }
        
        /*await redisClient.setEx(cacheKey, 3600, JSON.stringify(faq));*/

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const createFAQ = async (req, res) => {  
    const { question, answer, languageCode } = req.body;
    const {lang}=req.query;
    try {
        const faq = await FAQ.findOne({question});
        if(!faq){
                const newFaq= new FAQ({question,answer,languageCode});
                await newFaq.save();
                const translations = await translateFAQ(newFaq);
                const newtranslations = await Translation.insertMany(translations);
                newFaq.translation.push(...newtranslations.map(t=>t._id));
                await newFaq.save();
                res.status(201).json({"faq":newFaq,"translations":translations});
            }
            else{
                res.status(409).json({ message: "FAQ already exists" });
            }
        
        }
    catch (error) {
        res.status(500).json({ message: error.message,msg:"why" });
    }
}

export const updateFAQ = async (req, res) => {
    
}

export const deleteFAQ = async (req, res) => {

}