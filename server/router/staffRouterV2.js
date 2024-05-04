const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');
const Staff=require('../models/staffV2');
const cloudinary=require('../utlis/cloudinary');

router.get('/', async (req, res) => {
    try {
      const staffMembers = await Staff.find().populate('user');
      res.json(staffMembers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });// PUT route to update staff by User ID
  router.put('/:userId', upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'researchPapers', maxCount: 5 }
    ]), async (req, res) => {
    try {
        const staff = await Staff.findOne({ user: req.params.userId });
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        // Handle profile picture upload
        if (req.files && req.files['profilePicture']) {
            const profilePictureResult = await cloudinary.uploader.upload(req.files['profilePicture'][0].path);
            staff.profilePicture = {
                public_id: profilePictureResult.public_id,
                secure_url: profilePictureResult.secure_url
            };
        }

        // Handle research papers upload
        if (req.files && req.files['researchPapers'] ) {
            const researchPapersResults = await Promise.all(req.files['researchPapers'].map(async (file) => {
                return await cloudinary.uploader.upload(file.path);
            }));
            staff.researchPapers = researchPapersResults.map(paper => {
                return {
                    public_id: paper.public_id,
                    secure_url: paper.secure_url
                };
            });
        }

        // Update other fields if provided in the request body
        if (req.body.brief) {
            staff.brief = req.body.brief;
        }
        if (req.body.subjectHistory) {
            staff.subjectHistory = req.body.subjectHistory;
        }

        await staff.save();
        res.json(staff);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

  router.get('/:userId', async (req, res) => {
    try {
      const staffMember = await Staff.findOne({ user: req.params.userId }).populate('user');
      if (!staffMember) {
        return res.status(404).json({ message: 'Staff member not found' });
      }
      res.json(staffMember);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  module.exports=router