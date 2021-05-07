# Api

## Solutions

- [GET] Solutions

```sh
http://localhost:3000/solutions/?from=[FROM]&to=[TO]&ar=[A|R|AR]&date=[DATE]&time=[TIME]&adults=[ADULTS]&childrens=[CHILDRENS]&direction=[A|R|AR]&frecce=[TRUE|FALSE]&onlyRegional=[TRUE|FALSE]

# example
http://localhost:3000/solutions/?from=FANO&to=CESENA&ar=A&date=04/05/2021&time=10.00&adults=1&childrens=0&direction=A&frecce=false&onlyRegional=false
```

```json
[
  {
    "idsolution": "a567fbd0fc28655891e5ea2427732d80i0",
    "origin": "Fano",
    "destination": "Cesena",
    "direction": "A",
    "departuretime": 1620119340000,
    "arrivaltime": 1620122700000,
    "duration": "00:56",
    "trains": [
      {
        "trainidentifier": "Intercity 606",
        "acronym": "IC",
        "trainid": "606",
        "origin": "S11119",
        "time": "1620252000000"
      }
    ]
  },
  ...
]
```

- [GET] Solutions Detail [NOT WORKING BECAUSE COOKIE]

ATTENZIONE: Funziona solo se la richiesta viene effetuata da un client che abbia già aperto una sessione con il sito,
ad esempio facendo una ricerca soluzioni. Non può pertanto essere usata come prima richiesta verso il server.
A questo proposito, assicurarsi che i cookie siano abilitati e condivisi tra le richieste,
in modo che quelli che settati vengano poi inviati al server nelle successive

```sh
http://localhost:3000/solutions/[SOLUTION_ID] #deprecated
```

## Trains

- [GET] Trains info by TRAIN_ID, STATION_CODE and DEPARTURE_TIME from solution's trains

```sh
http://localhost:3000/trains/[TRAIN_ID]?origin=[STATION_CODE]&time=[DEPARTURE_TIME]

# example
http://localhost:3000/trains/606?origin=S11119&time=1620252000000
```

```json
{
  ...
  "oraUltimoRilevamento": 1620298830000,
  "ritardo": 1,
  "compRitardo": [
    "ritardo 1 min.",
    "delay 1 min.",
    ...
  ],
  "fermate": [
    {
      "stazione": "BARI CENTRALE",
      "id": "S11119",
      "ritardo": 1,
      "partenzaReale": 1620273360000,
      "partenza_teorica": 1620273360000,
      ...
    },
    {
      "stazione": "MOLFETTA",
      "id": "S11114",
      "ritardo": 0,
      "partenzaReale": null,
      "partenza_teorica": 1620274380000,
      ...
    },
    ...
  ],
  ...
}
```

## Stations

- [GET] Get station arrivals info by STATION_CODE

```sh
http://localhost:3000/stations/arrivals/[STATION_CODE]

# example
http://localhost:3000/stations/arrivals/S11119
```

```json
[
  {
    "numeroTreno": 19842,
    "categoria": "REG",
    "compNumeroTreno": "REG 19842",
    "origine": "TARANTO",
    "codOrigine": "S11465",
    "binarioEffettivoArrivoCodice": null,
    "binarioEffettivoArrivoDescrizione": null,
    "binarioProgrammatoArrivoCodice": null,
    "binarioProgrammatoArrivoDescrizione": "7",
    "binario": "7",
    "orarioArrivo": 1620298200000,
    "ritardo": 0,
  },
  ...
]
```

- [GET] Get station departures info by STATION_CODE

```sh
http://localhost:3000/stations/departures/[STATION_CODE]

# example
http://localhost:3000/stations/departures/S11119
```

```json
[
  {
    "numeroTreno": 23541,
    "categoria": "REG",
    "compNumeroTreno": "REG 23541",
    "destinazione": "FASANO",
    "codOrigine": "S11108",
    "binarioEffettivoPartenzaCodice": null,
    "binarioEffettivoPartenzaDescrizione": null,
    "binarioProgrammatoPartenzaCodice": null,
    "binarioProgrammatoPartenzaDescrizione": "1",
    "binario": "1",
    "orarioPartenza": 1620307140000,
    "ritardo": 13
  },
  ...
]
```

## Npm Packages

- nodemon
- cors
- axios
- [DEV] eslint eslint-config-airbnb eslint-plugin-jsx-a11y
- [DEV] prettier eslint-config-prettier eslint-plugin-prettier
