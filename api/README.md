# Api

## Solutions

```sh
http://localhost:3000/solutions/?from=[FROM]&to=[TO]&ar=[A|R|AR]&date=[DATE]&time=[TIME]&adults=[ADULTS]&childrens=[CHILDRENS]&direction=[A|R|AR]&frecce=[TRUE|FALSE]&onlyRegional=[TRUE|FALSE]
```

```sh
http://localhost:3000/solutions/[SOLUTION_ID] #deprecated
```

## Trains

```sh
http://localhost:3000/trains/[TRAIN_ID]?origin=[STATION_CODE]&time=[DEPARTURE_TIME]
```

## Stations

```sh
http://localhost:3000/stations/arrivals/[STATION_CODE]
```

```sh
http://localhost:3000/stations/departures/[STATION_CODE]
```

## Packages

- (DEV) eslint eslint-config-airbnb eslint-plugin-jsx-a11y
- (DEV) prettier eslint-config-prettier eslint-plugin-prettier
- nodemon
- cors
- axios
