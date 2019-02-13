const fs = require('fs');
const config = require('../config')

const read = () => new Promise((resolve, reject) => {
	fs.readFile(config().input, (err, data) => {
		if (err) {
			reject(err);
		};
		resolve(data.toString());
	});
});

const write = (data) => new Promise((resolve, reject) => {
	fs.writeFile(config().output, data, (err) => {
		if (err) {
			reject(err);
		};
		resolve();
	})
})

module.exports = {
	read,
	write
};
