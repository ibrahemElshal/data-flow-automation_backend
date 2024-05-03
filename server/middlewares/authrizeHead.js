const authorizeHead = (req, res, next) => {
    if (req.user.userType === 'head') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};
module.exports=authrizeHead;