// console.log("AUM");

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/product.route.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/products", router);

// /NodeAPI in the url is the cluster
mongoose.connect('mongodb+srv://maverick:maverick01@backenddb.zl6awsq.mongodb.net/NodeAPI?retryWrites=true&w=majority')
    .then(() => {
        // console.log('Connected to database!');
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch(() => console.log('Connection to database failed!'));