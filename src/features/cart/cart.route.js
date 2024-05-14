import express from "express";
import { CartItemController } from "./cart.controller.js";
const cartRouter = express.Router();

const cartItemController = new CartItemController();

cartRouter.post('/', cartItemController.add);
cartRouter.get('/', cartItemController.getCartItem);
cartRouter.delete('/', cartItemController.delete);
export default cartRouter;