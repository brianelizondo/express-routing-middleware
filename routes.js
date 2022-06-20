const express = require('express');
const router = new express.Router();
const ExpressError = require('./expressError');
let items = require('./fakeDb'); 


router.get('/', (req, res) => {
    res.json({ items });
});

router.post('/', (req, res) => {
    const newItem = {
        "name": req.body.name,
        "price": req.body.price
    };
    items.push(newItem);
    res.status(201).json({ newItem });
});

module.exports = router;