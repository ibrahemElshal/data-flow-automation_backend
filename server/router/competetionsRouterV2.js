const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload')
const cloudinary=require('../utlis/cloudinary');
const Competition = require('../models/competetionsV2');

router.post('/',upload.single('competitionPic'),async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const newCompetition = new Competition({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        competitionPic: {
          public_id: result.public_id,
          secure_url: result.secure_url
        }
      });
      await newCompetition.save();
      res.json(newCompetition);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
router.get('/',async (req, res) => {
    try {
      const competitions = await Competition.find();
      res.json(competitions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

router.get('/:id',async (req, res) => {
    try {
      const competition = await Competition.findById(req.params.id);
      if (!competition) {
        return res.status(404).json({ message: 'Competition not found' });
      }
      res.json(competition);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
router.put('/:id',upload.single('competitionPic'),async (req, res) => {
    try {
      const competition = await Competition.findById(req.params.id);
      if (!competition) {
        return res.status(404).json({ message: 'Competition not found' });
      }
      if (req.body.title) {
        competition.title = req.body.title;
      }
      if (req.body.description) {
        competition.description = req.body.description;
      }
      if (req.body.link) {
        competition.link = req.body.link;
      }
      await competition.save();
      res.json(competition);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
router.delete('/:id',async (req, res) => {
    try {
      const competition = await Competition.findById(req.params.id);
      if (!competition) {
        return res.status(404).json({ message: 'Competition not found' });
      }
      await cloudinary.uploader.destroy(competition.competitionPic.public_id);
      await competition.remove();
      res.json({ message: 'Competition deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports=router