const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};


exports.postAddProduct = (req, res, next) => {
    const product =  new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products)=>{
    //render default template engine
        res.render('shop/product-list',{prods:products, 
            pageTitle:'Shop', path: '/'});
    });
    
    
};