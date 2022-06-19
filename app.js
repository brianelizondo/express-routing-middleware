const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ExpressError = require('./expressError');
let cats = require('./fakeDb'); 






// 404 handler
app.use((req, res, next) => {
    const e = new ExpressError("Not Found", 404);
    return next(e);
});

app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
        error: {message, status}
    });
});

// Export app to start server from server.js
module.exports = app;