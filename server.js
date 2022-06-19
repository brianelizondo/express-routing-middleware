/*
* Start server from this file
*/
const app = require('./app')

app.listen(3000, () => {
    console.log("App runing on port 3000");
});