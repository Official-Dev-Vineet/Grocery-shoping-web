const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./product');


const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/grocery').then(() => {
    console.log('Connected to MongoDB');
})

app.use(cors());
app.use(express.json());

app.get('/search', async (req, res) => {
    const { query } = req.query;
    const reverseQuery = query.split('').reverse().join('');
    if (!query || query.length < 1) {
        return res.status(200).json({ count: 0, products: [] });
    }
    const price = parseFloat(query);
    const weight = parseFloat(query);
    const reversePrice = parseFloat(query.split('').reverse().join(''));
    const reverseWeight = parseFloat(query.split('').reverse().join(''));
    Product.find({
        $or: [
            { name: new RegExp(query, "i") },
            { category: new RegExp(query, "i") },
            { color: new RegExp(query, "i") },
            { name: new RegExp(reverseQuery, "i") },
            { category: new RegExp(reverseQuery, "i") },
            { color: new RegExp(reverseQuery, "i") },
            // Check if the query is a number before searching numeric fields
            ...(isNaN(price) ? [] : [{ price: price }]),
            ...(isNaN(weight) ? [] : [{ weight: weight }]),
            ...(isNaN(reversePrice) ? [] : [{ price: reversePrice }]),
            ...(isNaN(reverseWeight) ? [] : [{ weight: reverseWeight }]),
        ],
    }).exec().then(products => {
        if (products.length > 0) {
            res.status(200).json({
                count: products.length,
                products,
                code: 200
            })
        } else {
            res.status(403).json({
                message: "No products found",
                code: 403
            })
        }
    })
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
