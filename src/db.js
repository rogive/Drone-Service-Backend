const mongoose = require('mongoose');



function db() {

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect('mongodb://localhost:27017/droneservice')

  const { connection } = mongoose;

  connection.once('open', () => console.log('Connection established sucessful'));
  connection.on('error', (error) => console.log('Something went wrong!'));

  return connection;
}

module.exports = db;