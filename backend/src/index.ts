import Express from 'express';
import mongoose from 'mongoose';
import financialRecordRouter from './routes/financial-records';
import cors from 'cors';

const app = Express();

const port = process.env.PORT || 3001;  

app.use(Express.json());
app.use(cors());
const mongoURI: string = "mongodb+srv://23ucc589:89kQTuwlOuPn3Poy@finance-tracker.2hwnag8.mongodb.net/"

mongoose
.connect(mongoURI)
.then(()=>
    console.log("Connected to MongoDB"))
    .catch((err) => 
        console.error("Error connecting to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});