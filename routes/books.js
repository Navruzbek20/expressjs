const { Router } = require('express');
const uuid = require('uuid')
const router = Router();
const books = require('../Books')
// hammasni korish
router.get('/', (req, res) => {
    res.json(books);
});
// id boyicha korish
router.get('/:id', (req, res) => {
    const result = books.some(b => b.id === parseInt(req.params.id))
    if (result) {
        res.json(books.filter(b => b.id === parseInt(req.params.id)));
    } else {
        res.status(404).json({ message: `Siz soragan kitob yoq` });
    }
});
// malumot qoshish
router.post('/', (req, res) => {
    const newBook = {
        id: uuid.v4(),
        name: req.body.name,
        price: req.body.price
    }
    if(!req.body.name || !req.body.price){
        return res.status(400).json({message: `Iltimos malumotni togri kiriting`});
    }
    books.push(newBook)
     res.json(newBook);
});
// id boyicha edit
router.put('/:id', (req, res) => {
    const result = books.some(b => b.id === parseInt(req.params.id))
    if (result) {
       const updateBook = req.body
       books.forEach(book =>{
           if(book.id === parseInt(req.params.id)){
               book.name = updateBook.name ? updateBook.name : book.name,
               book.price = updateBook.price ? updateBook.price : book.price 
           }
            res.status(200).json({message: `Malumot yangilandi`, book});
       })
    } else {
        res.status(404).json({ message: `Siz soragan kitob yoq` });
    }
});
// delete
router.delete('/:id', (req, res) => {
    const result = books.some(b => b.id === parseInt(req.params.id))
    if (result) {
        res.json({message: 'Ochirildi', books: books.filter(b => b.id === parseInt(req.params.id))});
    } else {
        res.status(404).json({ message: `Siz soragan kitob yoq` });
    }
});

module.exports = router