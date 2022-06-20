const express = require('express');
const router = new express.Router();
const ExpressError = require('./expressError');
let items = require('./fakeDb'); 

// GET /items - this should render a list of shopping items.
router.get('/', (req, res) => {
    res.json({ items });
});

// POST /items - this route should accept JSON data and add it to the shopping list
router.post('/', (req, res) => {
    const newItem = {
        "name": req.body.name,
        "price": req.body.price
    };
    items.push(newItem);
    res.status(201).json({ newItem });
});

// GET /items/:name - this route should display a single item’s name and price
router.get('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if(foundItem === undefined){
        throw new ExpressError("Item not found", 404);
    }
    res.json({ item: foundItem });
});

// PATCH /items/:name, this route should modify a single item’s name and/or price
router.patch('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if(foundItem === undefined){
        throw new ExpressError("Item not found", 404);
    }
    foundItem.name = req.body.name;
    foundItem.price = req.body.price ? req.body.price : foundItem.price;
    res.json({ item: foundItem });
});

module.exports = router;