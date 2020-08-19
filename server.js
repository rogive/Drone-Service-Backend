const express = require('express');
const uuid = require('uuid-random');
const app = express();
app.use(express.json());

const users = [];

app.get('/', (req, res) => {
});



app.listen(8000, () => console.log('App listening localhost:8000'));