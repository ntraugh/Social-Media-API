const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialMediaNate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
