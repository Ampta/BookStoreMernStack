import express from "express";
import { Book } from "../models/book.model.js";

const router = express.Router();

// Route for Save a new Book
router.post("/", async (req, res) => {
  try {
    //check the inputs from body
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // create object of new book
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    // add newBook in database
    const book = await Book.create(newBook);

    // return res successfully new book added
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get one Book from database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    return res.status(200).json({ book });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put("/:id", async (req, res) => {
  try {
    // Validating inputs from body
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = req.params;

    // update the new values of book in the database
    const result = await Book.findByIdAndUpdate(id, req.body);

    // check update happend or not
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Delete a Book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete book from the database using id
    const result = await Book.findByIdAndDelete(id);

    // Check book is deleted or not
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
