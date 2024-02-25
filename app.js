import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import mongoose from "mongoose";
import { error } from "console";

const DB_URI = 'mongodb+srv://Anastasiia:qAI20JBkMpVxCoqU@cluster0.ffq32dt.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(DB_URI)
  .then(() => console.log("Database connection successful"))
  .catch(error => console.log("Databese connection error"));

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
