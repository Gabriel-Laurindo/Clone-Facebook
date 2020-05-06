require('dotenv').config

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const path = require('path')


app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/files', express.static(path.resolve(__dirname, 'tmp', 'uploads')))

require('./controllers/authController')(app);
require('./controllers/projectController')(app);


app.listen(3001)

