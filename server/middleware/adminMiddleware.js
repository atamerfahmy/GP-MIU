const adminMiddleware = (req, res, next) => {
  console.log(req.user)
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
module.exports = adminMiddleware;
