const express = require('express');
const router = new express.Router();
const ExpressError = require('./expressError');
let items = require('./fakeDb'); 


router.get('/', (req, res) => {
    res.json({ items });
});

module.exports = router;