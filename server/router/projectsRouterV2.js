const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');
const {createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject}=require('../controllers/projectController');


router.get('/',async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
router.post('/', upload.fields([
    { name: 'mainPic', maxCount: 1 },
    { name: 'additionalPictures', maxCount: 5 },
    { name: 'teamMembers', maxCount: 5 }
  ]), async (req, res) => {
    try {
      const mainPicResult = await cloudinary.uploader.upload(req.files['mainPic'][0].path);
      const additionalPicturesResults = await Promise.all(req.files['additionalPictures'].map(async (file) => {
        return await cloudinary.uploader.upload(file.path);
      }));
      const teamMembersResults = await Promise.all(req.files['teamMembers'].map(async (file) => {
        return await cloudinary.uploader.upload(file.path);
      }));
  
      const teamMembers = req.body.teamMembers.map((teamMember, index) => {
        return {
          pic: {
            public_id: teamMembersResults[index].public_id,
            secure_url: teamMembersResults[index].secure_url
          },
          name: teamMember.name
        };
      });
  
      const newProject = new Project({
        title: req.body.title,
        description: req.body.description,
        mainPic: {
          public_id: mainPicResult.public_id,
          secure_url: mainPicResult.secure_url
        },
        additionalPictures: additionalPicturesResults.map(pic => {
          return {
            public_id: pic.public_id,
            secure_url: pic.secure_url
          };
        }),
        teamMembers: teamMembers
      });
  
      await newProject.save();
      res.json(newProject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
router.get('/:id', async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  // PUT route to update a project by ID
router.put('/:id', upload.fields([
    { name: 'mainPic', maxCount: 1 },
    { name: 'additionalPictures', maxCount: 5 },
    { name: 'teamMembers', maxCount: 5 }
  ]), async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Handle file uploads if any
      if (req.files['mainPic']) {
        const mainPicResult = await cloudinary.uploader.upload(req.files['mainPic'][0].path);
        project.mainPic = {
          public_id: mainPicResult.public_id,
          secure_url: mainPicResult.secure_url
        };
      }
  
      if (req.files['additionalPictures']) {
        const additionalPicturesResults = await Promise.all(req.files['additionalPictures'].map(async (file) => {
          return await cloudinary.uploader.upload(file.path);
        }));
        project.additionalPictures = additionalPicturesResults.map(pic => {
          return {
            public_id: pic.public_id,
            secure_url: pic.secure_url
          };
        });
      }
  
      if (req.files['teamMembers']) {
        const teamMembersResults = await Promise.all(req.files['teamMembers'].map(async (file) => {
          return await cloudinary.uploader.upload(file.path);
        }));
  
        const teamMembers = req.body.teamMembers.map((teamMember, index) => {
          return {
            pic: {
              public_id: teamMembersResults[index].public_id,
              secure_url: teamMembersResults[index].secure_url
            },
            name: teamMember.name
          };
        });
        project.teamMembers = teamMembers;
      }
  
      // Update other fields if provided in the request body
      if (req.body.title) {
        project.title = req.body.title;
      }
      if (req.body.description) {
        project.description = req.body.description;
      }
      // You can add more properties to update here
  
      await project.save();
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// DELETE route to delete a project by ID
router.delete('/:id', async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Delete main picture, additional pictures, and team members' pictures from Cloudinary
      await cloudinary.uploader.destroy(project.mainPic.public_id);
      await Promise.all(project.additionalPictures.map(async (pic) => {
        await cloudinary.uploader.destroy(pic.public_id);
      }));
      await Promise.all(project.teamMembers.map(async (teamMember) => {
        await cloudinary.uploader.destroy(teamMember.pic.public_id);
      }));
  
      await project.remove();
      res.json({ message: 'Project deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  module.exports=router;