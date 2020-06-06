const express = require('express');

const adminData = require('../routes/admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {
        pageTitle: 'My shop',
        products: products,
        path: '/'
    });
});


module.exports = router;