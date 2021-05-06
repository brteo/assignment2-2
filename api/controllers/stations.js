/* eslint-disable no-unused-vars */
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

		const ret = result.data.map(item => {
			const obj = {};
			obj.id = 'A-' + item.numeroTreno + '-' + item.codOrigine;
			obj.numeroTreno = item.numeroTreno;
			obj.categoria = item.categoria;
			obj.compNumeroTreno = item.compNumeroTreno;
			obj.origine = item.origine;
			obj.codOrigine = item.codOrigine;
			obj.binarioEffettivoArrivoCodice = item.binarioEffettivoArrivoCodice;
			obj.binarioEffettivoArrivoDescrizione = item.binarioEffettivoArrivoDescrizione;
			obj.binarioProgrammatoArrivoCodice = item.binarioProgrammatoArrivoCodice;
			obj.binarioProgrammatoArrivoDescrizione = item.binarioProgrammatoArrivoDescrizione;
			obj.binario = obj.binarioEffettivoArrivoDescrizione
				? obj.binarioEffettivoArrivoDescrizione
				: obj.binarioProgrammatoArrivoDescrizione;
			obj.orarioArrivo = item.orarioArrivo;
			obj.ritardo = item.ritardo;

			return obj;
		});

		res.status(200).json(ret);
	} catch (error) {
		next(error);
	}
};

exports.getRealTimeStationDepartures = async (req, res, next) => {
	try {
		const result = await getRealTimeStationInfo('partenze', req.params.id);

		const ret = result.data.map(item => {
			const obj = {};
			obj.id = 'D-' + item.numeroTreno + '-' + item.codOrigine;
			obj.numeroTreno = item.numeroTreno;
			obj.categoria = item.categoria;
			obj.compNumeroTreno = item.compNumeroTreno;
			obj.destinazione = item.destinazione;
			obj.codOrigine = item.codOrigine;
			obj.binarioEffettivoPartenzaCodice = item.binarioEffettivoPartenzaCodice;
			obj.binarioEffettivoPartenzaDescrizione = item.binarioEffettivoPartenzaDescrizione;
			obj.binarioProgrammatoPartenzaCodice = item.binarioProgrammatoPartenzaCodice;
			obj.binarioProgrammatoPartenzaDescrizione = item.binarioProgrammatoPartenzaDescrizione;
			obj.binario = obj.binarioEffettivoPartenzaDescrizione
				? obj.binarioEffettivoPartenzaDescrizione
				: obj.binarioProgrammatoPartenzaDescrizione;
			obj.orarioPartenza = item.orarioPartenza;
			obj.ritardo = item.ritardo;

			return obj;
		});

		res.status(200).json(ret);
	} catch (error) {
		next(error);
	}
};
