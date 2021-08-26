import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {

    try {

        const token = req.headers.authorisation.split(" ")[1];

        console.log(token);
        
        const isCustomeAuth = token.length < 500;

        let decodedData;

        if(token && isCustomeAuth) {
            decodedData = jwt.verify(token, 'test');
            console.log(decodedData);
            

            req.userId = decodedData?.id;

        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
        
    } catch (error) {
        console.log(error);
        
    }
}

export default auth;