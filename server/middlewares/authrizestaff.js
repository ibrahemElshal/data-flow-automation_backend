
const authorizeStaff = (req, res, next) => {
    if (req.user.userType === 'staff') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};
module.exports=authorizeStaff;