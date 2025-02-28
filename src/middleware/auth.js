const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
    const token = req.headers["authorization"]
    console.log(token);

    if(!token){
        res.status(400).json({ msg: "Token inválido ou não fornecido."})
        return
    }

    jwt.verify(token, "M!nh4S3nh4Secreta", (err, decode) => {
         if(err){
            console.log(err);
            res.status(400).json({ msg: "Token inválido ou não fornecido."})
            return
         }

         console.log(decode);
         req.session = decode
         next()
    })

    
}

module.exports =authMiddleware