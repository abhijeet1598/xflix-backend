const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

let server;

mongoose.connect(config.mongodb_uri).then(() => {
    console.log("Connected to MongoDB");
    server = app.listen(config.port, () => {
        console.log(`Server is listening at port ${config.port}`);
    } );
}).catch((error) => {
    console.log("Error connecting to MongoDB : ", error);
})