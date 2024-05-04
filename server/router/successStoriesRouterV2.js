const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');
const cloudinary=require('../utlis/cloudinary');
const SuccessStory=require('../models/success_storyV2')


router.get('/',async (req, res, next) => {
    try {
      const successStories = await SuccessStory.find();
      res.json(successStories);
    } catch (err) {
      next(err);
    }
  });
router.get('/:id',async (req, res, next) => {
    try {
      const successStory = await SuccessStory.findById(req.params.id);
      if (!successStory) {
        return res.status(404).json({ error: 'Success story not found' });
      }
      res.json(successStory);
    } catch (err) {
      next(err);
    }
  });
router.post('/',upload.fields([{ name: 'mainPicture', maxCount: 1 }, { name: 'additionalPictures', maxCount: 10 }, { name: 'video', maxCount: 1 }, { name: 'teamMembersPictures', maxCount: 10 }]), async (req, res, next) => {
    try {
      const mainPictureResult = req.files['mainPicture']
        ? await cloudinary.uploader.upload(req.files['mainPicture'][0].path)
        : null;

      const additionalPicturesResults = await Promise.all(
        (req.files['additionalPictures'] || []).map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return {
            public_id: result.public_id,
            secure_url: result.secure_url
          };
        })
      );

      const teamMemberPicturesResults = await Promise.all(
        (req.files['teamMemberPictures'] || []).map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return {
            public_id: result.public_id,
            secure_url: result.secure_url
          };
        })
      );

      const videoResult = req.files['video']
        ? await cloudinary.uploader.upload(req.files['video'][0].path, {
            resource_type: 'video',
          })
        : null;

      const newSuccessStory = new SuccessStory({
        ...req.body,
        mainPicture: mainPictureResult
          ? {
              public_id: mainPictureResult.public_id,
              secure_url: mainPictureResult.secure_url
            }
          : undefined,
        additionalPictures: additionalPicturesResults,
        video: videoResult
          ? {
              public_id: videoResult.public_id,
              secure_url: videoResult.secure_url
            }
          : undefined,
        teamMembers: req.body.teamMembers.map((member, index) => ({
          ...member,
          picture: teamMemberPicturesResults[index] || {}
        }))
      });
      await newSuccessStory.save();
      res.status(201).json(newSuccessStory);
    } catch (err) {
      next(err);
    }
  });
router.put('/:id',async (req, res, next) => {
    try {
      const mainPictureResult = req.files['mainPicture']
        ? await cloudinary.uploader.upload(req.files['mainPicture'][0].path)
        : null;

      const additionalPicturesResults = await Promise.all(
        (req.files['additionalPictures'] || []).map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return {
            public_id: result.public_id,
            secure_url: result.secure_url
          };
        })
      );

      const teamMemberPicturesResults = await Promise.all(
        (req.files['teamMemberPicture'] || []).map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return {
            public_id: result.public_id,
            secure_url: result.secure_url
          };
        })
      );

      const videoResult = req.files['video']
        ? await cloudinaryUploadVideo(req.files['video'][0].path, {
            resource_type: 'video'
          })
        : null;

      const updatedSuccessStory = await SuccessStory.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          mainPicture: mainPictureResult
            ? {
                public_id: mainPictureResult.public_id,
                secure_url: mainPictureResult.secure_url
              }
            : undefined,
          additionalPictures: additionalPicturesResults,
          video: videoResult
            ? {
                public_id: videoResult.public_id,
                secure_url: videoResult.secure_url
              }
            : undefined,
          teamMembers: req.body.teamMembers.map((member, index) => ({
            ...member,
            picture: teamMemberPicturesResults[index] || {}
          }))
        },
        { new: true }
      );
      if (!updatedSuccessStory) {
        return res.status(404).json({ error: 'Success story not found' });
      }
      res.json(updatedSuccessStory);
    } catch (err) {
      next(err);
    }
  });
router.delete(':id',async (req, res, next) => {
    try {
      const deletedSuccessStory = await SuccessStory.findByIdAndRemove(req.params.id);
      if (!deletedSuccessStory) {
        return res.status(404).json({ error: 'Success story not found' });
      }
      // Delete the main picture from Cloudinary
      await cloudinary.uploader.destroy(deletedSuccessStory.mainPicture.public_id);
      // Delete the additional pictures from Cloudinary
      for (const picture of deletedSuccessStory.additionalPictures) {
        await cloudinary.uploader.destroy(picture.public_id);
      }
      // Delete the team member pictures from Cloudinary
      for (const member of deletedSuccessStory.teamMembers) {
        await cloudinary.uploader.destroy(member.picture.public_id);
      }
      // Delete the video from Cloudinary
      await cloudinary.uploader.destroy(deletedSuccessStory.video.public_id, {
        resource_type: 'video'
      });
      res.json({ message: 'Success story deleted successfully' });
    } catch (err) {
      next(err);
    }
  });

module.exports=router;