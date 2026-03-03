import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try{
       const authHeader = req.headers.authorization;

       if(!authHeader) 
        return res.status(401).json({message : "No token received"});

       const token = authHeader.split(" ")[1]; // [ "bearer" "token" ] is presen tin authHeader

       const decoded = jwt.verify(token , "mysecretkey");  // decoded contains {id : "OBJECT_USER_ID" , ..}

       req.user = decoded; // when the whole object consists of user.id , iat, exp using which we can access user_id
       next();

    }catch(err){

       return res.status(401).json({message : "Unauthorized"});

    }
};