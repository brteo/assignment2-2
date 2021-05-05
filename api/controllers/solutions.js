const axios = require('axios');

const getTrainInfo = async trains => {
	const promises = trains.map(async train => {
		const id = train.trainidentifier.split(' ').pop();

		try {
			const result = await axios.get(
				'http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/cercaNumeroTrenoTrenoAutocomplete/' + id,
				{ withCredentials: true }
			);

			// 606 - BARI CENTRALE|606-S11119-1620165600000\n
			const s = result.data.split('|').pop();
			return {
				trainidentifier: train.trainidentifier,
				trainid: s.split('-')[0],
				origin: s.split('-')[1],
				time: s.split('-')[2].replace('\n', '')
			};
		} catch (err) {
			return {
				trainidentifier: train.trainidentifier,
				error: err.message
			};
		}
	});

	return Promise.all(promises);
};

exports.getTrainSolutions = async (req, res, next) => {
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

		const ret = await Promise.all(
			result.data.map(async item => {
				const obj = {};
				obj.id = 'TEST';
				obj.idsolution = item.idsolution;
				obj.origin = item.origin;
				obj.destination = item.destination;
				obj.direction = item.direction;
				obj.departuretime = item.departuretime;
				obj.arrivaltime = item.arrivaltime;
				obj.duration = item.duration;
				obj.trains = await getTrainInfo(item.trainlist);

				return obj;
			})
		);

		res.status(200).json(ret);
	} catch (error) {
		next(error);
	}
};

/* 
non funziona a causa dei cookie nelle richieste: 
ATTENZIONE: Funziona solo se la richiesta viene effetuata da un client che abbia già aperto una sessione con il sito, 
ad esempio facendo una ricerca soluzioni. Non può pertanto essere usata come prima richiesta verso il server. 
A questo proposito, assicurarsi che i cookie siano abilitati e condivisi tra le richieste, 
in modo che quelli che settati vengano poi inviati al server nelle successive 
*/
exports.getTrainSolutionById = async (req, res, next) => {
	try {
		const result = await axios.get(
			'https://www.lefrecce.it/msite/api/solutions/64b2b91918e37ecc16b449453357d63i0/details' +
				req.params.id +
				'/details',
			{
				withCredentials: true
			}
		);

		res.status(200).json(result.data);
	} catch (error) {
		next(error);
	}
};
