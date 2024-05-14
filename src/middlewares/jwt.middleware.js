import jwt from 'jsonwebtoken'
const jwtAuth = (req, res, next) => {
    //1.REad Token
    const token = req.headers['authorization'];
    console.log(token);
    //2. if no token,reurn error
    if (!token) {
        return res.status(401).send("UnaAuthorised")
    }
    //3. check if token is valid
    try {
        const payload = jwt.verify(
            token,
            'BalleBalle'
        );
        req.userId=payload.userID;
        console.log(payload);
        //4. else return error
    } catch (error) {
        console.log(error);
        return res.status(401).send("UnaAuthorised inside catch")
    }
    //5. call next middleware
    next();

}

export default jwtAuth;  
