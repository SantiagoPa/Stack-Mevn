const express  = require('express');
const morgan   = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/mevn-database',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(db => console.log('database is connected'))
.catch(err => console.error(err));


//Settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/tasks',require('./routes/tasks'));

//Static files
app.use(express.static(__dirname + '/public'))

//Server is Listening
app.listen(app.get('port'), ()=>{
    console.log('Server listening on port', app.get('port'));
});