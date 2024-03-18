import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import routes from './controllers/index.js';
import sequelize from './config/connection.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000',"https://apple-a-day-cafe.netlify.app" ]; // add deployed URL here
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.options('*', (req,res) => { res.sendStatus(200) });

app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
