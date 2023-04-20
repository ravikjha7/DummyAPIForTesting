const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const employeeRoutes = require('./routes/employee.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/employee', employeeRoutes);

app.use('/greeting', (req, res) => {
    res.status(200).send("Hello world!");
}) 



app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})