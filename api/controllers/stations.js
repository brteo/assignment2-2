const axios = require('axios');

exports.getRealTimeStationInfo = async (req, res, next) => {
	try {
		const result = await axios.get('https://www.lefrecce.it/msite/api/solutions', {
			withCredentials: true,
			params: {
				origin: req.query.from,
				destination: req.query.to,
				arflag: req.query.ar,
				adate: req.query.date,
				atime: req.query.time,
				adultno: req.query.adults,
				childno: req.query.childrens,
				direction: req.query.direction,
				frecce: req.query.direction,
				onlyRegional: req.query.onlyRegional
			}
		});

		res.status(200).json(result.data);
	} catch (error) {
		next(error);
	}
};
