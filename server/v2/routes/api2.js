import express from 'express';
import adminRoute from './admin';
import eventRoute from './event';
import userRoute from './user';

const app = express.Router();
adminRoute(app);
eventRoute(app);
userRoute(app);


module.exports = app;
