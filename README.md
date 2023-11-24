Ini adalah repository Back-End untuk [BRIK](https://brik.id/) Code Challenge.

# Getting Started
## Step 1: Installation

First, install all the packages

```bash
# using npm
npm instal OR npm i

# OR using Yarn
yarn
```

## Step 2: Migration

Second, run all the migrations:

```bash
npx sequelize-cli db:migrate
```

## Step 3: Migration

Third, run all the seeders:

```bash
npx sequelize-cli db:seed:all
```
Ohh, don't forget to create the database first :D (I use PostgreSQL)

## Step 4: Start the Server

Finally, run the development server:

```bash
nodemon
```
## Credential
After running the seeder and running the development server, there is an account available to log in to

```bash
# email
john@example.com

# password
password
```
Or you can create your account via the register feature :D
