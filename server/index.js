import express from 'express';
import bodyParser from 'body-parser';
import adminRoute from './routes/admin';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

adminRoute(app);
app.get('/', (req, res) => {
  res.send('HELLO COME TO EVENT MANAGER');
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
