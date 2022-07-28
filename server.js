const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express();
const PORT = process.env.PORT || 4400;
app.get("/", (req, res) => {
    res.send("a todo project")
});


mongoose.connect('mongodb://localhost:27017',
    { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
})
db.once('open', () => {
    console.log('database connected...')
});

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(require("./routes/routes"))

app.listen(PORT, () => {
    console.log(`server started at the port ${PORT}`)
})