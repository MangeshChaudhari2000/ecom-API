import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
export class UserController {
    signUp(req, res) {
        const { name, email, password, type } = req.body;
        const isSignUp = UserModel.signUp(name, email, password, type);
        if (isSignUp) {
            res.status(200).send("user signup successfully")
        } else {
            res.status(404).send("Please entre valid data")
        }
    }

    signIn(req, res) {
        const isSignin = UserModel.signIn(req.body.email, req.body.password);
        if (isSignin) {
            //1.create token
            const token1 = jwt.sign(
                {
                    userID: isSignin.id,
                    email: isSignin.email
                },
                "BalleBalle",
                {
                    expiresIn: '1h'
                }
            )
            res.status(200).send(token1);

            // res.status(200).send(" SignIn Successfully")
        } else {
            return res.status(400).send("invalid Credentials")
        }
    }
}