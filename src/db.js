const mongoose = require('mongoose');
const { url } = require("./key");

function db() {

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(url, options);
  
  const { connection } = mongoose;
  
  connection.once('open', () => console.log('Connection established sucessful'));
  connection.on('error', (error) => console.log('Something went wrong!'));

  return connection;
}

module.exports = db;