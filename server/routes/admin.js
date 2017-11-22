import {admin} from '../controllers'

module.exports = (app) => {
	app.post('/centers', admin.createCenter),
	app.get('/centers', admin.centers),
	app.get('/centers/:id', admin.center),
	app.put('/centers/:id', admin.editCenter)
}