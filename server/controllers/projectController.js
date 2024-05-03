const Project = require('../models/project');

// Controller functions

// Create a new project
const createProject =  async (req, res) => {
  console.log('fdsfs');
  try {
    const { mainPic, title, description, teamMembers } = req.body;
    const additionalPictures = req.files['additionalPictures'] ? req.files['additionalPictures'].map(file => file.path) : [];

    const newProject = new Project({
      mainPic: req.files['mainPic'][0].path,
      title,
      description,
      additionalPictures,
      teamMembers: teamMembers.map((member, index) => ({
        pic: req.files['teamMembers'][index].path,
        name: member.name
      }))
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Get a specific project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a project by ID
const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { title, description, teamMembers } = req.body;
    const additionalPictures = req.files['additionalPictures'] ? req.files['additionalPictures'].map(file => file.path) : [];

    const updatedProject = {
      title,
      description,
      additionalPictures,
      teamMembers: teamMembers.map((member, index) => ({
        pic: req.files['teamMembers'][index].path,
        name: member.name
      }))
    };

    if (req.files['mainPic'] && req.files['mainPic'].length > 0) {
      updatedProject.mainPic = req.files['mainPic'][0].path;
    }

    const result = await Project.findByIdAndUpdate(projectId, updatedProject, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Delete a project by ID
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};
