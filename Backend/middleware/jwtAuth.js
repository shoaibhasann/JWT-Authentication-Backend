const JWT = require('jsonwebtoken');  // Import jsonwebtoken 

// Token authentication middleware
const authenticateToken = (req,res,next) => {
      // extract token from request cookies
      const token = (req.cookies && req.cookies.token) || null;

      // check if token exists
      if(!token){
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
      }

      // verify token
      try {
        // implement verification
        const payload = JWT.verify(token,process.env.SECRET);
        req.user = {id: payload.id, email: payload.email};

      } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
      }
      
      next();

};