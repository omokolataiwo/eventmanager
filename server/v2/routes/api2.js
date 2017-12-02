import express from 'express';
import centerRoute from './center';
import eventRoute from './event';
import userRoute from './user';

const app = express.Router();
centerRoute(app);
eventRoute(app);
userRoute(app);
module.exports = app;
