// console.log("AUM");

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Product = require('./models/product.model.js');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });

app.get('/', (req, res) => {
    res.send("Node API Server");
});

app.post('/api/products', async (req, res) => {
    // res.send("Data Received");
    // console.log(req.body);
    // res.send(req.body);

    try {
        const product = await Product.create(req.body);
        // console.log(product);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/product/:id', async(req, res)=>{
    try {
        const {id}=req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.delete('/api/product/:id', async(req, res)=>{
    try {
        const {id}=req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message:"Product deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// /NodeAPI in the url is the cluster
mongoose.connect('mongodb+srv://maverick:maverick01@backenddb.zl6awsq.mongodb.net/NodeAPI?retryWrites=true&w=majority')
    .then(() => {
        // console.log('Connected to database!');
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch(() => console.log('Connection to database failed!'));