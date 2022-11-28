const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json');

//⁡⁣⁣⁢#𝗿𝗲𝗴𝗶𝗼𝗻 𝗵𝗲𝗹𝗽𝗲𝗿 𝗳𝘂𝗻𝗰𝘁𝗶𝗼𝗻⁡
const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}
//⁡⁣⁣⁢#𝗲𝗻𝗱𝗿𝗲𝗴𝗶𝗼𝗻⁡

const products = [];

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(
                    prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id){
        getProductsFromFile(products => {
            //⁡⁢⁢⁢𝘄𝗶𝗹𝗹 𝗴𝗲𝘁 𝗽𝗿𝗶𝗰𝗲 𝗳𝗿𝗼𝗺 𝘁𝗵𝗲 𝗽𝗿𝗼𝗱𝘂𝗰𝘁 ⁡
            const product = products.find(prod=> prod.id ===id);

            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if(!err){
                    Cart.deleteProduct(id,product.price);
                }
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    //Loading product detail
    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }

}