import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


let count = 1;
import centers from './models'
import adminRoute from './routes/admin'

adminRoute(app);
app.get('/', function(req, res) {
	res.send("count is now >< " + centers.centers.one.name);
})

app.listen(3000, () => {
	console.log('Listening on 3000');
})