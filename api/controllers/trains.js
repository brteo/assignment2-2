const axios = require('axios');

exports.getRealTimeTrainInfo = async (req, res, next) => {
	try {
		const result = await axios.get(
			'http://www.viaggiatreno.it/viaggiatrenomobile/resteasy/viaggiatreno/andamentoTreno/' +
				req.query.origin +
				'/' +
				req.params.id +
				'/' +
				req.query.time,
			{ withCredentials: true }
		);

		res.status(200).json(result.data);
	} catch (error) {
		next(error);
	}
};
