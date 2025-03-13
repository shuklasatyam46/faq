import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMondoDB.js';
import faqRoutes from './routes/faq.routes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use("/api/faqs",faqRoutes);

app.listen(3000, () => {
    connectToMongoDB();
    console.log('Server is running on http://localhost:3000');
});

