const express = require('express')
const app = express();
const connectDatabase = require('./config/db.js')
const authRouter = require('./routes/authRoute.js');
const cookieParser = require('cookie-parser');

connectDatabase();
// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.use('/api/auth',authRouter);

app.use('/', (req,res) => {
    res.status(200).json({
        data: 'JWTauth Server updated'
    })
});

module.exports = app;