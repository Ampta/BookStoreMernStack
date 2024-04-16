import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/book.route.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());
// Middleware for handling CORS POLICY
// Option 1: allow all origins wiht default of cors(*)
// app.use(cors());

// Option 2: allow Custom origin
app.use(
  cors({
    origin: "http:localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN STACK Tutorial");
});

app.use("/books", bookRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
