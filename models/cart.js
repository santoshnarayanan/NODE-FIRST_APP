const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //fetch previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // ⁡⁢⁣⁡⁢⁢⁢analyze the cart => find existing product⁡⁡
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // add new product / increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                //⁡⁢⁢⁢if new product⁡
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            //⁡⁢⁢⁢price is updated⁡
            cart.totalPrice = cart.totalPrice + +productPrice;
            //write to json file
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });

        });
    }

    static deleteProduct(id,productPrice){
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return;
            }
            //⁡⁢⁣⁣⁡⁣⁢⁢𝗨𝗽𝗱𝗮𝘁𝗲 𝗖𝗮𝗿𝘁 𝗳𝗼𝗿 𝗽𝗿𝗶𝗰𝗲 𝗼𝗳 𝗽𝗿𝗼𝗱𝘂𝗰𝘁⁡
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod=>prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod=>prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            //write to json file
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }
};