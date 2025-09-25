import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  // Look for token in Authorization header
  // const token = req.header('Authorization')?.replace('Bearer ', '');

  // HTTP Only Cookie
  const token = req.cookies.jwt;
  // console.log("token recieved :",token);
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });    
    } 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id,name, email and role }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};