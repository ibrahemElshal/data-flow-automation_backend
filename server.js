const express =require('express');
const router=require('./server/router/router.js');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const dotenv=require('dotenv');
const {requireAuth,checkUser}=require('./server/middlewares/authMiddleware');
const path=require('path');
const dbConnection=require('./server/database/connection');
const jwt=require('jsonwebtoken');



const authRoutes=require('./server/router/authRoutes');
const externalTrainingRouter=require('./server/router/externalTrainingRouter');
const internalTrainingRouter=require('./server/router/internalTrainingRouter');
const competetionsRouter=require('./server/router/competetionsRouter');
const successStoriesRouter=require('./server/router/successStoriesRouter');
const projectsRouter=require('./server/router/projectsRouter')
const userRouter=require('./server/router/userRouter');


const app=express();

dotenv.config({path:'config.env'});

//port number
const PORT=process.env.PORT;

app.use(morgan('tiny'))
app.use(bodyParser.json());
app.set('view engine','ejs');
dbConnection();


app.use('/css',express.static(path.resolve(__dirname,'assets/css')));
app.use('/img',express.static(path.resolve(__dirname,'assets/img')));
app.use('/img',express.static(path.resolve(__dirname,'uploads')));
app.use('/js',express.static(path.resolve(__dirname,'assets/js')));
app.listen(PORT,()=>{
    console.log(`server is up succesfully on http://localhost:${PORT}`)
});

app.get('*',checkUser);
app.use('/',authRoutes);
app.use('/api/v1/externalTrainings',externalTrainingRouter);
app.use('/api/v1/internalTrainings',internalTrainingRouter)
app.use('/api/v1/competitions',competetionsRouter);
app.use('/api/v1/successStories',successStoriesRouter)
app.use('/api/v1/projects',projectsRouter)
app.use('/api/v1/users',userRouter)



//app.use('/',router);

