const express = require('express');
const cors = require('cors');

const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/category', require('./routers/ProductCategoryRouter'));
app.use('/api/products', require('./routers/ProductRouter'));

app.listen(port, function () {
    console.log(`Server running on localhost:${port}`);
});