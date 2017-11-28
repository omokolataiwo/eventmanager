import express from 'express';
import adminRoute from './admin';
import eventRoute from './event';

const app = express.Router();
adminRoute(app);
eventRoute(app);
module.exports = app;
