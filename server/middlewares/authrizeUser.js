const authorizeStudent = (req, res, next) => {
    if (req.user.userType === 'student') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};
module.exports=authrizeStudent
