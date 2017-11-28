import express from 'express';
import bodyParser from 'body-parser';
import apiv1 from './v1/routes/api1';
import apiv2 from './v2/routes/api2';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/v1', apiv1);
app.use('/v2', apiv2);

app.use('/', apiv1);

app.listen(3000, () => {
  console.log('Listening on 3000');
});

module.exports = app;
