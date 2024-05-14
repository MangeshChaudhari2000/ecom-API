//manage routes of ProductController

/*
1.Import expreess
2. initialise express rouer

*/
import { upload } from '../../middlewares/fileupload.middleware.js'
import express from 'express';
import ProductController from './product.controller.js';

const productRouter = express.Router();  //goal of router is when this route called hs method


const productController = new ProductController();
//all path to controller method
//localhost/api/product  will be pass from server.js
//using upload.array('filname','count of file') we can send multiple file
productRouter.get('/', productController.getAllProducts);
productRouter.post('/', upload.single('imageUrl'), productController.addProducts);
productRouter.get('/:id', productController.getOneProduct);
productRouter.get('/filter', productController.filterProducts);
productRouter.post('/rate', productController.rateProduct);



export default productRouter;
