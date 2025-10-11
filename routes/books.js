const express = require("express")
const BookModel = require("../model/book")

const routes = express.Router()

//Get All Books
routes.get("/books", (req, res) => {
    BookModel.find({})
        .then((books)=>{
            res.status(200).json({
                satus: true,
                message: "Books fetched successfully",
                count: books.length,
                data: books
            })
        })
        .catch((err)=>{
            res.status(500).json({
                status: false,
                message: err.message
            })
        })
    })


//Add NEW Book
routes.post("/books", async (req, res) => {
    const newBookData = req.body
    try{
        const newBookModel = new BookModel(newBookData)
        const newBook = await newBookModel.save()
    }catch(error){
        res.status(600).json({
            status:false,
            message: err.message
        })
    }
})

//Update existing Book By Id
routes.put("/book/:bookid", (req, res) => {
    res.send({message: "Update existing Book By Id"})
})

//Delete Book By ID
routes.delete("/book/:bookid", (req, res) => {
    res.send({message: "Delete Book By ID"})
})

//Get Book By ID
routes.get("/book/:bookid", (req, res) => {
    res.send({message: "Get Book By ID"})
})

//Get All Books in sorted order
routes.get("/books/sort", (req, res) => {
    res.send({message: "Get All Books in sorted order"})
})

module.exports = routes