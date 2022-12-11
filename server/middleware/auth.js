import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;

        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;


        }

        next();

    } catch (error) {
        console.log(error)
    }
}


// const isAdmin = (req, res, next) => {
//     auth(req, res, () => {
//         if(req.user.isAdmin){
//             next();
//         }
//         else{
//            res.status(403).send("Access denied. Not Admin...")
//            console.log(error)
//         }
//     })
// }

export default auth;