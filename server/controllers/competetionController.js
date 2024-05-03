const Competition = require('../models/competetion');

// Controller functions

// Create a new competition
const createCompetition = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const competitionPic = req.file.path; // Uploaded competition picture path
    const competition = new Competition({ title, description, link, competitionPic });
    await competition.save();
    res.status(201).json({ message: 'Competition created successfully', competition });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get all competitions
const getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find();
    res.json(competitions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific competition by ID
const getCompetitionById = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.json(competition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a competition by ID
const updateCompetition =async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    const { title, description, link } = req.body;
    if(title){
      competition.title = title;
    }
    if(description){
      competition.description = description;
    }
    if(link){
      competition.link = link;
    }
    
    if (req.file) {
      competition.competitionPic = req.file.path; // Update competition picture if uploaded
    }

    await competition.save();
    res.json({  competition });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a competition by ID
const deleteCompetition = async (req, res) => {
  try {
    const competition = await Competition.findByIdAndDelete(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.status(204).json(); // No content will be send
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCompetition,
  getCompetitions,
  getCompetitionById,
  updateCompetition,
  deleteCompetition
};
