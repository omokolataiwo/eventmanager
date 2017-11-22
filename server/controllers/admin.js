import database from '../models'
let count = 0;

module.exports = {
	createCenter(req, res) {
		database.centers.one.name = database.centers.one.name + count+1;
		return res.send(centers.centers.one);
	},
	centers (req. res) {
		res.send("All centers");
	},
	center (req, res) {
		res.send("Get center with id");
	},
	editCenter (req, res) {
		res.send("Edit center");
	}
}