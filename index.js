const express = require('express');
const app = express();
const mongoose = require('mongoose');


const Content = require('./content.model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//connect to DB
mongoose.
    connect('mongodb://127.0.0.1:27017/iot', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));



//Endpoint to save data
app.post("/upload_content", async (req, res) => {

    const newContent = await Content.create(req.body);

    if (!newContent) {
        res.status(400).send({
            success: false,
            error: 'Could not save content'
        });
    }

    res.status(200).send({
        success: true,
        content: newContent
    });
})


app.listen(3000, () => console.log('Example app listening on port 3000!'));