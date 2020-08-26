require('./models/db');

const express = require('express');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const placeController = require('./controllers/placeController');
const hotelController = require('./controllers/hotelController');
const restaurantController = require('./controllers/restaurantController');
const userController = require('./controllers/userController');
const indexController = require('./controllers/indexController');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyparser.urlencoded({
    extended:true
}));

app.use(bodyparser.json());
app.use(cookieParser());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' ,handlebars:allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'hbs','handlebars');
app.use(expressSession({secret:'max',saveUninitialized:false,resave:false}))

app.listen(4001,()=>{
    console.log('Express server started at port : 4000');
});

app.use('/place',placeController);
app.use('/hotel',hotelController);
app.use('/restaurant',restaurantController);
app.use('/api/user',userController);
app.use('/',indexController);

