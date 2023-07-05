import jwt from "jsonwebtoken";
export default function apiAuth(req,res,next){
    try {
        console.log(req.headers)
        const token = jwt.verify(req.headers?.authorization?.split(" ")[1], process.env.JWT_SECRET);
        req.loggedIn=true;
        next()
    } catch{
        
        res.status(403).json({msg:"invalid token"})
    }
}