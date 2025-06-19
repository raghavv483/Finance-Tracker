import express, { Request, Response, Router } from 'express';
import FinancialRecordModel from '../schema/financial-record';

const router: Router = express.Router();

router.get(
  '/getAllByUserId/:userId',
  async (
    req: Request<{ userId: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.params.userId;

      if (!userId) {
        res.status(400).send('User ID is required');
        return;
      }

      const records = await FinancialRecordModel.find({ userId });

      if (records.length === 0) {
        res.status(404).send('No records found for this user.');
        return;
      }

      res.status(200).json(records);
    } catch (err) {
      console.error('Error fetching records:', err);
      res.status(500).send('Internal server error');
    }
  }
);

router.post("/", async (req: Request, res: Response): Promise<void> => {
    try{
        const newRecordBody = req.body;
        const newRecord = new FinancialRecordModel(newRecordBody);
        const savedRecord = await newRecord.save();
        res.status(200).send(savedRecord);
        

    }
    catch(err){
      console.log("hello");
      
      res.status(500).send(err);
    }
    
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;

    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );

    if (!record) {
      res.status(404).send("Record not found");
      return;
    }

    res.status(200).send(record);
    return;
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});
router.delete("/:id",async (req: Request, res: Response): Promise<void>=> {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record){
      res.status(404).send(); return
    } 
    
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});
export default router;
