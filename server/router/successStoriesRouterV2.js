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
      res.status(400).json(err.message);
      next(err);
    }
  });
  router.put('/:id', async (req, res, next) => {
    try {
      // Handle cases where req.files is undefined
      const mainPictureResult = req.files && req.files['mainPicture']
        ? await cloudinary.uploader.upload(req.files['mainPicture'][0].path)
        : null;
  
      // Handle cases where req.files['additionalPictures'] is undefined
      const additionalPicturesResults = await Promise.all(
        (req.files && req.files['additionalPictures'] || []).map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return {
            public_id: result.public_id,
            secure_url: result.secure_url
          };
        })
      );
  
      // Handle cases where req.files['teamMemberPicture'] is undefined
      const teamMemberPicturesResults = await Promise.all(
        (req.files && req.files['teamMemberPicture'] || []).map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return {
            public_id: result.public_id,
            secure_url: result.secure_url
          };
        })
      );
  
      // Handle cases where req.files['video'] is undefined
      const videoResult = req.files && req.files['video']
        ? await cloudinaryUploadVideo(req.files['video'][0].path, {
            resource_type: 'video'
          })
        : null;
  
      const updatedSuccessStory = await SuccessStory.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          // Ensure mainPictureResult is defined before accessing its properties
          mainPicture: mainPictureResult
            ? {
                public_id: mainPictureResult.public_id,
                secure_url: mainPictureResult.secure_url
              }
            : undefined,
          additionalPictures: additionalPicturesResults,
          // Ensure videoResult is defined before accessing its properties
          video: videoResult
            ? {
                public_id: videoResult.public_id,
                secure_url: videoResult.secure_url
              }
            : undefined,
          // Map through req.body.teamMembers only if it's an array
          teamMembers: Array.isArray(req.body.teamMembers) ? req.body.teamMembers.map((member, index) => ({
            ...member,
            // Ensure teamMemberPicturesResults[index] is defined before accessing its properties
            picture: teamMemberPicturesResults[index] || {}
          })) : []
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
  
  router.delete('/:id', async (req, res, next) => {
    try {
        const deletedSuccessStory = await SuccessStory.findByIdAndDelete(req.params.id);
        if (!deletedSuccessStory) {
            return res.status(404).json({ error: 'Success story not found' });
        }

        // Delete main picture from Cloudinary
        if (deletedSuccessStory.mainPicture && deletedSuccessStory.mainPicture.public_id) {
            await cloudinary.uploader.destroy(deletedSuccessStory.mainPicture.public_id);
        }

        // Delete additional pictures from Cloudinary
        if (deletedSuccessStory.additionalPictures && deletedSuccessStory.additionalPictures.length > 0) {
            await Promise.all(deletedSuccessStory.additionalPictures.map(async (picture) => {
                if (picture && picture.public_id) {
                    await cloudinary.uploader.destroy(picture.public_id);
                }
            }));
        }

        // Delete team member pictures from Cloudinary
        if (deletedSuccessStory.teamMembers && deletedSuccessStory.teamMembers.length > 0) {
            await Promise.all(deletedSuccessStory.teamMembers.map(async (member) => {
                if (member.picture && member.picture.public_id) {
                    await cloudinary.uploader.destroy(member.picture.public_id);
                }
            }));
        }

        // Delete video from Cloudinary
        if (deletedSuccessStory.video && deletedSuccessStory.video.public_id) {
            await cloudinary.uploader.destroy(deletedSuccessStory.video.public_id, {
                resource_type: 'video'
            });
        }

        res.json({ message: 'Success story deleted successfully' });
    } catch (error) {
        console.error(error);
        next(error); // Pass the error to the error handling middleware
    }
});

module.exports=router;