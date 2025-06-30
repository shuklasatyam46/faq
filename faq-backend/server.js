import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMondoDB.js';
import faqRoutes from './routes/faq.routes.js';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use("/api/faqs",faqRoutes);

app.listen(3000, () => {
    connectToMongoDB();
    console.log('Server is running on http://localhost:3000');
});

