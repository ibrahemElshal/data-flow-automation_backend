const Staff=require('../models/staff')
const getAllStaff=async(req,res)=>{
    try {
        // Find all staff members and populate the 'user' field with user data
        const staffMembers = await Staff.find().populate('user');
        res.json(staffMembers);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
}