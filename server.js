const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const sendEmail = require('./email');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/sendEmail', (req, res) => {
    
    try {
        
        const { email, subject, message } = req.body;
        sendEmail(email, subject, message);

        res.status(200).json("Email Sent Successfully !!!");

    } catch (error) {
        
        res.status(400).json("Error !!!");

    }

})


app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})