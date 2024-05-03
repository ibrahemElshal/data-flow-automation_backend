const axios =require('axios');
const getHomePage=(req,res)=>{
    res.render('home');
}
const getDepartmentMembersPage=(req,res)=>{
    res.send({message:"Department members"});
}
const getSuccessStoriesPage = (req, res) => {
    axios.get("http://localhost:3000/api/v1/successStories")
        .then(response => {
            res.render('successstories', { successStories: response.data });
        })
        .catch(error => {
            // Handle error
            console.error('Error fetching success stories:', error);
            res.status(500).send('Error fetching success stories');
        });
}
const getSuccessStory=(req,res)=>{
    axios.get(`http://localhost:3000/api/v1/successStory/${req.params.id}`)
        .then(response=>{
            res.render('successstory',{message:'story' , data :response.data})
        }).catch(error => {
            console.error('Error fetching projects:', error);
            res.status(500).send('Error fetching projects');
        });
}


const getLoginPage=(req,res)=>{
    res.render('login');
}
const getTrainingPage=(req,res)=>{
    res.send({message:"Training"});
}

const getProjectsPage = (req, res) => {
    axios.get("http://localhost:3000/api/v1/projects")
        .then(response => {
            res.render('project',{ message: "Projects", data: response.data });
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
            res.status(500).send('Error fetching projects');
        });
}
const getproject=(req,res)=>{
    axios.get(`http://localhost:3000/api/v1/project/${req.params.id}`)
        .then(response=>{
            res.render('project',{message:'story' , data :response.data})
        }).catch(error => {
            console.error('Error fetching projects:', error);
            res.status(500).send('Error fetching projects');
        });
}



const getCompetitionsPage = (req, res) => {
    axios.get("http://localhost:3000/api/v1/competitions")
        .then(response => {
            res.render('competitions',{ message: "Competitions", data: response.data });
        })
        .catch(error => {
            console.error('Error fetching competitions:', error);
            res.status(500).send('Error fetching competitions');
        });
}
const getCompetition=(req,res)=>{
    axios.get(`http://localhost:3000/api/v1/competition/${req.params.id}`)
        .then(response=>{
            res.render('competetion',{message:'competeion' , data :response.data})
        }).catch(error => {
            console.error('Error fetching projects:', error);
            res.status(500).send('Error fetching projects');
        });
}


const getStudyPlanPage=(req,res)=>{
    res.render('studyplan');
}
//add url
const getInternalTrainingsPage = (req, res) => {
    axios.get("http://localhost:3000/api/v1/internalTrainings")
        .then(response => {
            res.render('training',{ message: "InternalTrainings", data: response.data });
        })
        .catch(error => {
            console.error('Error fetching internal training:', error);
            res.status(500).send('Error fetching internal training');
        });
}
const getInternalTrainingPage =(req,res)=>{
    axios.get(`http://localhost:3000/api/v1/internalTraining/${req.params.id}`)
        .then(response=>{
            res.render('internaltraining',{message:'InternalTraining' , data :response.data})
        }).catch(error => {
            console.error('Error fetching projects:', error);
            res.status(500).send('Error fetching projects');
        });
}

//add url
const getExternalTrainingsPage = (req, res) => {
    axios.get("http://localhost:3000/api/v1/externalTrainings")
        .then(response => {
            res.render('extraining',{ message: "ExternalTraining", data: response.data });
        })
        .catch(error => {
            console.error('Error fetching external training:', error);
            res.status(500).send('Error fetching external training');
        });
}
const getExternalTrainingPage =(req,res)=>{
    axios.get(`http://localhost:3000/api/v1/externalTraining/${req.params.id}`)
        .then(response=>{
            res.render('externaltraining',{message:'ExternalTraining' , data :response.data})
        }).catch(error => {
            console.error('Error fetching projects:', error);
            res.status(500).send('Error fetching projects');
        });
}
const getAbout=(req,res)=>{
    res.send({message:"About"});
}

module.exports = {
    getHomePage,
    getDepartmentMembersPage,
    getSuccessStoriesPage,
    getLoginPage,
    getProjectsPage,
    getCompetitionsPage,
    getTrainingPage,
    getStudyPlanPage,
    getInternalTrainingPage,
    getExternalTrainingPage,
    getInternalTrainingsPage,
    getExternalTrainingsPage,
    getAbout,
    getSuccessStory,
    getCompetition,
    getproject
};
