const fs = require('fs');
const path = require('path');

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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
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