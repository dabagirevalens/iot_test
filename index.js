const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const Content = require('./content.model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//connect to DB
mongoose.
    connect('mongodb+srv://dabagire:s6vQIOnkigg1jbpG@testuser.3w0lr.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));



//Endpoint to save data
app.post("/upload_content", async (req, res) => {
    try {

        const { content } = req.body
        
        const newContent = await Content.create({ content });

        if (!newContent) {
            res.status(400).send({
                success: false,
                error: 'Could not save content'
            });
        }

        res.status(200).send({
            success: true,
            message: '👌Content uploaded successfully!'
        });
    } catch (error) {
        console.log("error", error);
    }
})



app.listen(process.env.PORT, () => console.log('Example app listening on port 3000!'));
