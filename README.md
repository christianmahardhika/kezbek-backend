# kezbek-backend

Kezbek is a type of application that allows users to earn rewards or cash back when they make purchases at participating merchants. These apps often have partnerships with a variety of retailers, restaurants, e-commerce and other businesses, and offer users a percentage of their purchase price back in the form of cash or other rewards.

## Feature

- Loyalty program for customer
- Reward for customer
- Coupon Cashback for customer
- Seemless integration with merchant (partner)
- Seemless integration with payment gateway (e-wallet) by customer MSISDN

- [*]CMS for merchant
- [*]Report for invoice and transaction for merchant
- [*]Check loyalty point for customer

**NOTE:** [*] is additional feature

Currently, we are integrating with dummy payment gateway and dummy merchant

## ERD

![Data Structure](./docs/data_structure.png)

## Architecture

![Architecture](./docs/Kezbek-be-arch.drawio.png)

## How to run it locally

before please install [docker engine](https://docs.docker.com/engine/install/) and [docker compose](https://docs.docker.com/compose/install/)

install [latest nodeJS](https://nodejs.org/en/download/)

```bash
# run docker compose to setup the stacks that need by app

docker compose -f ./Deploy/docker-compose.yml up -d

if docker compose is finished, you can run the app by click this url the OPEN API documentation at

localhost:3001/api-document (loyalty service) or localhost:3002/api-document (promo service) or localhost:3003/api-document (transaction service)

# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Library
