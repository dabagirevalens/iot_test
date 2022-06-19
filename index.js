const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


const Content = require('./content.model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


//connect to DB
mongoose.
    connect('mongodb+srv://dabagire:s6vQIOnkigg1jbpG@testuser.3w0lr.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB ', mongoose.connection.host))
    .catch(err => console.error('Could not connect to MongoDB:', err));



//Endpoint to save data
app.post("/upload_content", async (req, res) => {
    try {

        const { content } = req.body

        const newContent = await Content.create({ content });

        if (!newContent) {
            return res.status(400).send({
                success: false,
                error: 'Could not save content'
            });
        }

        return res.status(200).send({
            success: true,
            message: '👌Content uploaded successfully!',
            data: newContent
        });
    } catch (error) {
        console.log("error", error);
    }
})

app.get('/', async (req, res) => {
    try {
        const contents = await Content.find({});

        if (!contents) {
            return res.status(400).json({
                success: false,
                error: 'Could not find any content'
            })
        }

        return res.status(200).json({
            success: true,
            contents
        })
    } catch (error) {
        console.log(error)
    }
})



app.listen(process.env.PORT, () => console.log('Example app listening on port 3000!'));
