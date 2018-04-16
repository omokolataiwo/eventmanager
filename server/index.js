import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiv1 from './v1/routes/api1';
import apiv2 from './v2/routes/api2';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1', apiv1);
app.use('/api/v2', apiv2);

app.get('/', apiv2);
app.use((err, req, res) => {
  if (err.isBoom) {
    const errors = err.output.payload.message.split(',');
    let ret = '';
    errors.forEach((error) => {
      const singleError = error.split(/\[/);
      ret = singleError[singleError.length - 1];
      ret = ret.match(/.+[^\]]/)[0];
    });
    return res.status(err.output.statusCode).json(ret);
  }
  return res.json(err);
});

app.listen(process.env.PORT || 5000);

module.exports = app;
