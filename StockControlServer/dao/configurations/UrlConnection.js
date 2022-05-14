const mongoose = require('mongoose');

const localConnectionUrl = "mongodb+srv://thiagofernandes101:fxbjorevUAsHU5zj@collegestudenttest.nizhe.mongodb.net/stockControlDb?retryWrites=true&w=majority";
mongoose.connect(localConnectionUrl, { useNewUrlParser: true });

module.exports = mongoose;