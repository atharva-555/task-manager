export const roleGuard = (roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole) {
      return res.status(401).json({ error: 'User role not found' });
    }
    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: `Access denied for role: ${userRole}` });
    }
    next();
  };
};