import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import todosRoutes from "./routes/todos.js";
const app = express();
dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/todos", todosRoutes);

app.get("/", (req, res) => {
  res.send("Welcom to our server");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);

mongoose
  .connect(process.env.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`server is running on port ${PORT}`))
  .catch((err) => console.log(err));
