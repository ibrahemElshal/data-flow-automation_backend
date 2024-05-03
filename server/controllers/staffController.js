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
const updateStaffProfile=async (req, res) => {
  try {
    const userId = req.params.userId;
    const { brief, researchPapers, subjectHistory } = req.body;

    // Check if the user exists and has the role of "staff"
    const user = await User.findById(userId);
    if (!user || user.role !== 'staff') {
      return res.status(404).json({ error: 'User not found or is not a staff member' });
    }

    // Update staff profile information
    const staff = await Staff.findOneAndUpdate(
      { user: userId }, // Find staff member by user ID
      { 
        profilePicture: req.file ? req.file.path : null, // Path to uploaded profile picture
        brief, 
        researchPapers, 
        subjectHistory 
      },
      { new: true, upsert: true } // Create new staff profile if it doesn't exist
    );

    res.json(staff); // Return updated staff profile
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports={
  getAllStaff,
  updateStaffProfile
}