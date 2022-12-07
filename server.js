const express = require('express');
var helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const authJwt = require('./middlewares/fireJWT');

const firebaseConfig = require('./config/serviceAccountKey.json');

// const fire = initializeApp(firebaseConfig);
// console.log(fire);
var admin = require('firebase-admin');
const mongoose = require('mongoose');

dotenv.config();
// var serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: 'https://event-e7848-default-rtdb.firebaseio.com',
});

app.use(helmet());
app.disable('x-powered-by');

app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true,
  }),
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/uploads', express.static('uploads'));

// var corsOptions = {
//   origin: "http://localhost:8080",
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

mongoose
  .connect(
    // `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    process.env.DB_URL,
    // 'mongodb+srv://test:test@cluster0.fev5rey.mongodb.net/CRUSH?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    },
  )
  .then(() => {
    console.log('Successfully connect to MongoDB.');
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

// simple route
app.get('/', (req, res) => {
  res.json({ message: "Bienvenue sur l'API Crush" });
});
require('./routes/interest.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
