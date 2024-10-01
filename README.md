## Simply Wall St Api

- Web framework: Nest
- Database library: better-sqlite3
- Testing library: Jest
- Swagger for OpenApi documentation

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit and e2e tests
$ npm run test

# unit tests
$ npm run test:unit

# e2e tests
$ npm run test:e2e
```

## Api
The api can be accessed by:
````
GET http://localhost:3000/companies
````

### Examples
#### Include prices
http://localhost:3000/companies?include=prices
#### Include daily Volatility
http://localhost:3000/companies?include=dailyVolatility
#### Filter by exchange symbol
http://localhost:3000/companies?exchangeSymbol=asx
#### Filter by total score
http://localhost:3000/companies?totalScore=10
#### Sort by score (lowest first)
http://localhost:3000/companies?sort=totalScore&sortAsc=true


### Features

- Filters - filters are available using the following query parameters
  - `totalScore`
  - `exchangeSymbol`
- Includes - Return additional data in the request
  - `prices`
  - `dailyVolatility`
- Order
  - `sort=totalScore`
  - `sortAsc=true/false`

## Swagger docs
This project includes swagger docs
````
http://localhost:3000/api
````

## Notes
- The `.env` has been included in the project, this is done for convenience purposes and not advisable for a real system
- E2E tests are using the provided database to test against, if the database was dynamic, generating the records for each test would be preferred