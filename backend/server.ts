import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/models-db', {
  useNewUrlParser: true,
});

// Define the schema for a model
interface Model {
  firstName: string;
  lastName: string;
  picture: string;
  gender: string;
  dateOfBirth: Date;
  profession: string;
  shoeSize: number;
  hairColor: number;
  hairLength: number;
  waistSize: number;
  height: number;
  weight: number;
  castings: string[];
}

const ModelSchema = new mongoose.Schema<Model>({
  firstName: String,
  lastName: String,
  picture: String,
  gender: String,
  dateOfBirth: Date,
  profession: String,
  shoeSize: Number,
  hairColor: Number,
  hairLength: Number,
  waistSize: Number,
  height: Number,
  weight: Number,
  castings: [String],
});

const Model = mongoose.model<Model>('Model', ModelSchema);

// Handle the form submission
app.post('/api/models', async (req: Request, res: Response) => {
  const model = new Model(req.body);
  await model.save();
  res.send({ message: 'Model saved successfully' });
});

// Handle the search submission
app.get('/api/models/search', async (req: Request, res: Response) => {
  const { hairColor, hairLength, height, profession } = req.query;
  const query: any = {};
  if (hairColor) query.hairColor = hairColor;
  if (hairLength) query.hairLength = hairLength;
  if (height) query.height = height;
  if (profession) query.profession = profession;
  const models = await Model.find(query);
  res.send(models);
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});