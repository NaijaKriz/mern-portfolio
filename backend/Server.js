

const express = require('express')
const app = express()
require("dotenv").config();
const dbConfig = require("./config/dbConfig.js")
const portfolioRoute = require("./routes/portfolioRoute.jsx")
app.use(express.json())
app.use("/api/portfolio", portfolioRoute)






const port = process.env.PORT || 5000;


app.listen(port, () =>{
    console.log(`server is running in port ${port}`);
})