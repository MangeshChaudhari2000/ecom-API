import UserModel from "../features/user/user.model.js";

const basicAuthoriser = (req, res, next) => {
    //1.check if auth header is empty
    // haeaders[] its array bcase we can send many header with requst
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send("No authorisation details found");
    }
    console.log(authHeader);

    //2 extract credentials[Basic sqfv22hglkj3ll3]
    const base64credentials = authHeader.replace('Basic ', '');
    console.log(base64credentials);

    //3 decode credentials
    const decodedCreds=Buffer.from(base64credentials,'base64').toString('utf8');
    console.log(decodedCreds);
    const creds=decodedCreds.split(':');

    const user=UserModel.getAll().find(data=>data.email==creds[0] && data.password==creds[1]);
    if (user) {
        next();
    } else {
        return res.status(401).send("incorrect credentials")
    }

}

export default basicAuthoriser;