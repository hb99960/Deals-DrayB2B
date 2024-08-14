// My Express app
const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db');


const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 8083;
const AuthRouter = require('./Routes/AuthRouter');
const EmployeeRouter = require('./Routes/EmployeeRoutes');

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

// middleware
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/auth', AuthRouter);
app.use('/api', EmployeeRouter);

app.get("/ping", (req, res) => {
    res.send('PONG');
});
