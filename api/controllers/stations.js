const axios = require('axios');

const getRealTimeStationInfo = (type, station) => {
	const timestamp = new Date().toString().replace(/ *\([^)]*\) */g, '');
	return axios.get(
		'http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/' + type + '/' + station + '/' + timestamp,
		{
			withCredentials: true
		}
	);
};

exports.getRealTimeStationArrivals = async (req, res, next) => {
	try {
		const result = await getRealTimeStationInfo('arrivi', req.params.id);

		res.status(200).json(result.data);
	} catch (error) {
		next(error);
	}
};

exports.getRealTimeStationDepartures = async (req, res, next) => {
	try {
		const result = await getRealTimeStationInfo('partenze', req.params.id);

		res.status(200).json(result.data);
	} catch (error) {
		next(error);
	}
};
