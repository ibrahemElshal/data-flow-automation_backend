const express = require("express");
const router = require("./server/router/router.js");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const {
  requireAuth,
  checkUser,
} = require("./server/middlewares/authMiddleware");
const path = require("path");
const dbConnection = require("./server/database/connection");
const jwt = require("jsonwebtoken");
const cors = require("cors");


const authRoutes=require('./server/router/authRoutes');
const externalTrainingRouter=require('./server/router/externalTrainingRouter');
const internalTrainingRouter=require('./server/router/internalTrainingRouter');
const competetionsRouter=require('./server/router/competetionsRouter');
const successStoriesRouter=require('./server/router/successStoriesRouter');
const projectsRouter=require('./server/router/projectsRouter')
const userRouter=require('./server/router/userRouter');
const staffRouter=require('./server/router/staffRouter');
const formsRouter=require('./server/router/formsRouter');
const formsRouterV2=require('./server/router/formsRouterV2');






const externalTrainingRouterV2=require('./server/router/externalTrainingRouterV2');
const internalTrainingRouterV2=require('./server/router/internalTrainingRouterV2');
const successStoriesRouterV2=require('./server/router/successStoriesRouterV2');
const competetionsRouterV2=require('./server/router/competetionsRouterV2');
const projectsRouterV2=require('./server/router/projectsRouterV2');
const staffRouterV2=require('./server/router/staffRouterV2');





// const internalTrainingRouter=require('./server/router/internalTrainingRouter');
// const competetionsRouter=require('./server/router/competetionsRouter');
// const successStoriesRouter=require('./server/router/successStoriesRouter');
// const projectsRouter=require('./server/router/projectsRouter')
// const userRouter=require('./server/router/userRouter');
// const staffRouter=require('./server/router/staffRouter');
// const formsRouter=require('./server/router/formsRouter');
// const formsRouterV2=require('./server/router/formsRouterV2');


const app=express();

dotenv.config({path:'config.env'});
dotenv.config({ path: "config.env" });

//port number
const PORT = process.env.PORT;

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.set("view engine", "ejs");
dbConnection();

app.use(cors());

app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/img", express.static(path.resolve(__dirname, "uploads")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.listen(PORT, () => {
  console.log(`server is up succesfully on http://localhost:${PORT}`);
});

app.get('*',checkUser);
app.use('/',authRoutes);
app.use('/api/v1/externalTrainings',externalTrainingRouter);
app.use('/api/v1/internalTrainings',internalTrainingRouter);
app.use('/api/v1/competitions',competetionsRouter);
app.use('/api/v1/successStories',successStoriesRouter);
app.use('/api/v1/projects',projectsRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/staff',staffRouter);
app.use('/api/v1/forms',formsRouter);
app.use('/api/v1/formsV2',formsRouterV2);



// app.get('*',checkUser);
// app.use('/',authRoutes);
//here there is sign up 2
app.use('/api/v2/externalTrainings', externalTrainingRouterV2);
app.use('/api/v2/internalTrainings',internalTrainingRouterV2);
app.use('/api/v2/successStories',successStoriesRouterV2);
app.use('/api/v2/competitions',competetionsRouterV2);
app.use('/api/v2/projects',projectsRouterV2);
app.use('/api/v2/staff',staffRouterV2);




// app.use('/api/v1/internalTrainings',internalTrainingRouter);
// app.use('/api/v1/competitions',competetionsRouter);
// app.use('/api/v1/successStories',successStoriesRouter);
// app.use('/api/v1/projects',projectsRouter);
// app.use('/api/v1/users',userRouter);
// app.use('/api/v1/staff',staffRouter);
// app.use('/api/v1/forms',formsRouter);
// app.use('/api/v1/formsV2',formsRouterV2);






// app.get("*", checkUser);
// app.use("/", authRoutes);
// app.use("/api/v1/externalTrainings", externalTrainingRouter);
// app.use("/api/v1/internalTrainings", internalTrainingRouter);
// app.use("/api/v1/competitions", competetionsRouter);
// app.use("/api/v1/successStories", successStoriesRouter);
// app.use("/api/v1/projects", projectsRouter);
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/staff", staffRouter);
// app.use("/api/v1/forms", formsRouter);

//app.use('/',router);
