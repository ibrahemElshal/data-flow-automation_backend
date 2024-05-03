const Staff=require('../models/staff')
const User=require('../models/User')
const getDepartmentMembers=async(req,res)=>{
    //'staff','head'
    try {
        // Find all staff members and populate the 'user' field with user data
        const staffMembers = await Staff.find().populate('user');
    
        res.json(staffMembers);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
}
const getDepartmentMember=async(req,res)=>{
  try {
    // Find all staff members and populate the 'user' field with user data
    const staffMember = await Staff.find({_id:req.params.id});

    res.json(staffMember);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}
const updateStaffProfile=async(req,res)=>{
  
}
module.exports={
    getDepartmentMembers,
    getDepartmentMember
}