const mongoose = require('mongoose');

function db() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(process.env.URL_DB, options);
  
  const { connection } = mongoose;
  
  connection.once('open', () => console.log('Connection established sucessful'));
  connection.on('error', (error) => console.log('Something went wrong!'));

  return connection;
}

module.exports = db;