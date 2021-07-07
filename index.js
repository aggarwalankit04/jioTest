const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose');
const port = process.env.PORT || config.port;


// DataBaseConnection
const createConnectionUrl = `${config.localMongodb.url}${config.localMongodb.serverUrl}:${config.localMongodb.port}/${config.localMongodb.databaseName}`;

mongoose.connect(createConnectionUrl,{ useNewUrlParser:true, useUnifiedTopology: true },(err) => {
    if(!err){
        console.log(chalk.green('ParlingLot Db in mongodb connected...'));
    } else
    {
        console.log(chalk.red('Error in DB connection: ' + JSON.stringify(err, undefined, 2)));
    }
})

const app = express();

app.use(cors())
app.options('*', cors());

app.use(bodyparser.json({limit: '5mb', extended: true}))
app.use(bodyparser.urlencoded({limit: '5mb', extended: true}))

const apiRoutes = require('./routes/routes');
const userRouter = require('./routes/userRoutes');


app.use('/parkinglotProblem/api/v1/', apiRoutes);
app.use('/parkinglotProblem/api/v1/', userRouter);


//Capture All 404 errors
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

/* app.use((req, res, next) => {
  req.socket.on('error', () => {});
  next();
}); */


// Server
app.listen(port, () => {
  console.log(chalk.blueBright("Server is listening port number:", port));
})
