import { RequestHandler } from "express";

const options : RequestHandler = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  
    if ('OPTIONS' === req.method) {
      
      res.sendStatus(200);
    }
    else {
    
      next();
    }
}

export default options