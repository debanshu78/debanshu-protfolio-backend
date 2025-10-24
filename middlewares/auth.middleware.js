import jwt from 'jsonwebtoken';

export const isSignIn = (req, res, next) => {
  // Try to get token from cookie or Authorization header
  const token =
    req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Admin access only' });
};

export const isOwner = (req, res, next) => {
  // For routes like /api/users/:id
  if (req.user && req.user.id === req.params.id) {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: not your resource' });
};
