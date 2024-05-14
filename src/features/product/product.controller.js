import ProductModel from "./product.model.js"


export default class ProductController {

    getAllProducts(req, res) {
        const product = ProductModel.getAll();
        //rather than rendering sending data to client
        res.status(200).send(product);
    }

    addProducts(req, res) {
        console.log("into addProducts controller");
        const { name, price, sizes } = req.body;
        const newProduct = {
            name,
            price: parseFloat(price),
            sizes: sizes.split(','),//splits a string into an array of substrings & return array 
            imageUrl: req.file.filename,
        };
        const createdProduct = ProductModel.addProduct(newProduct);
        //status 201 means resource created successfully
        res.status(201).send(createdProduct)
    }

    rateProduct(req, res, next) {
        try {
            const userID = req.query.userID;
            const productID = req.query.productID;
            const rating = req.query.rating;

            try {
                const error = ProductModel.rateProduct(userID, productID, rating)
            } catch (error) {
                res.status(400).send(error.message);
            }
            res.status(200).send("rating done successfully");

        } catch (error) {
            next(error);
        }

    }

    getOneProduct(req, res) {
        const passedId = req.params.id;
        const product = ProductModel.get(passedId);
        if (!product) {
            res.status(404).send("product not found")
        } else {
            res.status(200).send(product)

        }
    }

    filterProducts(req, res) {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result = ProductModel.filter(minPrice, maxPrice, category);
        res.status(200).send(result);

    }
}