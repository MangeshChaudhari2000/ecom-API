import express from 'express';
import swagger from 'swagger-ui-express';

import productRouter from './src/features/product/product.routes.js'
import userRouter from './src/features/user/user.routes.js';
import bodyParser from 'body-parser';
import basicAuthoriser from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cart/cart.route.js';
import apiDocs from './swagger.json' assert {type: 'json'};
import cors from 'cors';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import applicationError from './error-handler/applicationError.js';

const server = express();

server.use(express.urlencoded({ extended: false }));

//CORS policy configuration
server.use(cors());

//middlewares
server.use(bodyParser.json())
server.use("/api/api-docs", swagger.serve, swagger.setup(apiDocs));
server.use("/api/products", jwtAuth, loggerMiddleware, productRouter);
server.use("/api/users", userRouter);
server.use("/api/cart", jwtAuth, cartRouter);


//for all request related o Produc redirect to product route
server.get('/', (req, res) => {
    res.send("Welcome to Ecommerce API")
})

//Error handler middleware
server.use((err, req, res, next) => {
console.log(err);
if(err instanceof applicationError){
    res.status(err.code,err.message);
}
res.status(500).send("Smething went wrong please try later")
})


//if none of paths match, middleware to handle 404
server.use((req, res) => {
    res.status(404).send("API Not Found")
})

server.listen(3000, () => {
    console.log("server is listning on 3000");
})


