const express = require("express");
const app = express();
const Router = require("./config/app");
 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

Router(app);

app.listen(8088, () => console.log('Server is running on port 8088'));