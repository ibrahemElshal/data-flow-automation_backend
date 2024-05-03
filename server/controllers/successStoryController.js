const SuccessStory = require('../models/success_story');

// Controller functions

// Create a new success story
const createSuccessStory = async (req, res) => {
  try {
    // Create a new success story object
    console.log('aaaaa')
    const successStory = new SuccessStory({
        title: req.body.title,
        description: req.body.description,
        mainPicture: req.files['mainPicture'][0].path,
        additionalPictures: req.files['additionalPictures'].map(file => file.path),
        video: req.files['video'] ? req.files['video'][0].path : null,
        teamMembers: req.body.teamMembers.map((member, index) => ({
            name: member.name,
            picture: req.files['teamMembersPictures'][index].path
        }))
    });
    // Save the success story to the database
    await successStory.save();
    res.status(201).send(successStory);
} catch (error) {
    res.status(400).send(error);
}
};

// Get all success stories
const getSuccessStories = async (req, res) => {
  try {
    const successStories = await SuccessStory.find();
    res.send(successStories);
} catch (error) {
    res.status(500).send(error);
}
};

// Get a specific success story by ID
const getSuccessStoryById = async (req, res) => {
  try {
    const successStory = await SuccessStory.findById(req.params.id);
    if (!successStory) {
      return res.status(404).json({ message: 'Success story not found' });
    }
    res.status(200).json(successStory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a success story by ID
const updateSuccessStory = async (req, res) => {
  try {
    const successStory = await SuccessStory.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        mainPicture: req.files['mainPicture'] ? req.files['mainPicture'][0].path : null,
        additionalPictures: req.files['additionalPictures'] ? req.files['additionalPictures'].map(file => file.path) : null,
        video: req.files['video'] ? req.files['video'][0].path : null,
        teamMembers: req.body.teamMembers ? req.body.teamMembers.map((member, index) => ({
            name: member.name,
            picture: req.files['teamMembersPictures'][index].path
        })) : null
    }, { new: true });
    if (!successStory) {
        return res.status(404).send();
    }
    res.send(successStory);
} catch (error) {
    res.status(400).send(error);
}
};

// Delete a success story by ID
const deleteSuccessStory =  async (req, res) => {
  try {
      const successStory = await SuccessStory.findByIdAndDelete(req.params.id);
      if (!successStory) {
          return res.status(404).send();
      }
      res.send(successStory);
  } catch (error) {
      res.status(500).send(error);
  }
};

module.exports = {
  createSuccessStory,
  getSuccessStories,
  getSuccessStoryById,
  updateSuccessStory,
  deleteSuccessStory
};
