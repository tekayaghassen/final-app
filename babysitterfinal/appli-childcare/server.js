const express = require ('express');
const mongoose = require ('mongoose');
const path = require ('path');
const config = require('config');



const app = express();

app.use(express.json());

const db = config.get('mongoURI');

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err));

app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

const port = process.env.PORT || 5000;
app.listen (port, (err)=>err? console.error(err):
console.log(`The server is running on port ${port}`));
