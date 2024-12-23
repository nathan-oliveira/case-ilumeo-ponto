<https://github.com/Ilumeobrasil/teste-tecnico-fullstack/blob/main/README.md>
<beatriz.carvalho@ilumeo.com.br>

# Author

[Nathan Oliveira Mendonça](https://www.linkedin.com/in/nathan-oliveira-mendonca)

### Requisitos

* nodejs >= 22.11.0
* docker >= 27.1.1
* docker-compose

## 1º Realizar a instalação das dependências através do [YARN](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

```bash
yarn install
```

## 2º Configurar a variável de ambiente

Renomeie o arquivo ".env.exemple" para ".env"

## Docker (PostgreSQL & PgAdmin)

## 3º Subir banco de dados no docker, execute os comandos

```bash
chmod +x .docker/entrypoint.sh
chmod +x .docker/postgres/create-schema.sh
dos2unix .docker/postgres/create-schema.sh
yarn install
yarn build
docker-compose up -d
```

### 4º Execute o comando abaixo para executar a aplicação localmente

```bash
yarn start:dev
```

## TypeORM 3 Commands

```bash
## create migration
$ npm run migration:create name

## run migration
$ npm run migration:run
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Node.js + Framework Nest.js is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
