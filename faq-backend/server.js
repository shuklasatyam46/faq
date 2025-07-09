import express from 'express';
import connectToMongoDB from './db/connectToMondoDB.js';
import faqRoutes from './routes/faq.routes.js';
import cors from 'cors';

const app = express();
const api_url = process.env.API;

app.use(cors({
    origin:`${api_url}`,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use("/api/faqs",faqRoutes);

app.listen(3000, () => {
    connectToMongoDB();
    console.log('Server is running on http://localhost:3000');
});

