# apple-a-day-pos-back

## Description

Backend for the Apple A Day point of sale system.

## Table of Contents

-  [Installation](#installation)
   -  [Dependencies](#dependencies)
   -  [Environment Variables](#environment-variables)
   -  [Database](#database)
   -  [Seeds](#seeds)
-  [Usage](#usage)
   -  [Start the Server](#start-the-server)
   -  [Routes](#routes)
-  [Credits](#credits)
-  [Questions](#questions)

# Installation

## Dependencies

```bash
npm i
```

This will install the following dependencies:

-  [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker)
-  [cors](https://www.npmjs.com/package/cors)
-  [dayjs](https://www.npmjs.com/package/dayjs)
-  [dotenv](https://www.npmjs.com/package/dotenv)
-  [express](https://www.npmjs.com/package/express)
-  [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
-  [mysql2](https://www.npmjs.com/package/mysql2)
-  [nodemon](https://www.npmjs.com/package/nodemon)
-  [sequelize](https://www.npmjs.com/package/sequelize)

## Environment Variables

```
DB_NAME=apple_a_day_pos_db
DB_USER=root
DB_PASSWORD=password

APP_PASSWORD=tacocat
JWT_SECRET=tacocat
```

Create a `.env` file at the root of this directory.

<br>

Your file structure should look something like this:

apple-a-day-pos-back<br>
├ config<br>
├ controllers<br>
├ db<br>
├ models<br>
├ node_modules<br>
├ public<br>
├ seed<br>
├ `.env`<br>
├ .gitignore<br>
├ cors.json<br>
├ package-lock.json<br>
├ package.json<br>
├ README.md<br>
└ server.js<br>

<br>

Add the following variables to the file:

| Variable       | Value                | Description                                              |
| :------------- | :------------------- | :------------------------------------------------------- |
| `DB_NAME`      | `apple_a_day_pos_db` | The name of your local database                          |
| `DB_USER`      | `root` (probably)    | Your local MySql user name - often "root"                |
| `DB_PASSWORD`  | **\*\*\*\*\*\*\*\*** | Your local MySql password                                |
| `APP_PASSWORD` | **\*\*\*\*\*\*\*\*** | Hard coded password for user login                       |
| `JWT_SECRET`   | **\*\*\*\*\*\*\*\*** | A passphrase used for signing and decoding jsonwebtokens |

## Database

```bash
npm run resetdb
```

This script drops the **apple_a_day_pos_db** database, if it exists, then creates a new one.

## Seeds

```bash
npm run seed
```

<div class="warning">
    <p><strong>⚠️ WARNING</strong><p>
    <p>Running this script will reset your database, deleting any existing data.</p>
</div>

### Number of Seeds

Seed data is randomly generated however you can specify the number of seeds.

<br>

Inside `seed/index.js`, the `generateSeedData()` function accepts 6 optional arguments:

| Argument         | Description                                 | Default Value   |
| :--------------- | :------------------------------------------ | :-------------- |
| numCustomers     | Defines number of customers to be returned  | 10              |
| numItems         | Defines number of items to be returned      | 10 _(max: 100)_ |
| numOrders        | Defines number of orders to be returned     | 20              |
| numShifts        | Defines number of shifts to be returned     | 5               |
| numItemsPerShift | Defines number of items available per shift | 4               |
| numItemsPerOrder | Defines number items purchased per order    | 1               |

#### **Example**

```js
const seeds = generateSeedData();

console.log(seeds.customers.length);
// output: 10
```

```js
const seeds = generateSeedData(45, 80, 200, 365, 3, 2);

console.log(seeds.customers.length);
// output: 45
```

# Usage

## Start the Server

```bash
npm start
```

This script runs `server.js` which spins up the express server, syncs the database, and logs the port number.

### Development Server

```bash
npm run dev
```

This script runs `server.js` with [nodemon](https://www.npmjs.com/package/nodemon) which restarts the server on every file save.

## Routes

```
/api
```

All routes start with `/api`.

### User Routes

There is one user route for logging in.

| Method | Result | Route         | Headers | Body |
| :----- | :----- | :------------ | :------ | :--- |
| POST   | Login  | `/user/login` | none    | JSON |

#### **Example**

```js
// Request

const login = async () => {
	const baseurl = process.env.BASE_URL;

	const options = {
		method: 'POST',
		body: JSON.stringify({ password: 'secret' })
	};

	try {
		const res = await fetch(baseurl + '/api/user/login', options);
		const data = await res.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};
```

```json
// Response

{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

### Customer Routes

You must be logged in to access all customer data.

| Method | Result | Route           | Headers                | Body |
| :----- | :----- | :-------------- | :--------------------- | :--- |
| GET    | All    | `/customer`     | Authorization: `token` | none |
| GET    | One    | `/customer/:id` | Authorization: `token` | none |
| POST   | New    | `/customer`     | Authorization: `token` | JSON |
| PUT    | Update | `/customer/:id` | Authorization: `token` | JSON |
| DELETE | Delete | `/customer/:id` | Authorization: `token` | none |

#### **Example**

```js
// Request

const getCustomers = async (token) => {
	const baseurl = process.env.BASE_URL;

	const options = {
		headers: {
			Authorization: token
		}
	};

	try {
		const res = await fetch(baseurl + '/api/customer', options);
		const data = await res.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};
```

```json
// Response

[
	{
		"id": 2,
		"firstName": "Franz",
		"lastName": "Anderson",
		"dateOfBirth": "1945-12-29T18:37:59.000Z",
		"createdAt": "2023-07-01T09:40:29.000Z",
		"updatedAt": "2023-07-01T09:40:29.000Z"
	},
	{
		"id": 8,
		"firstName": "Herminio",
		"lastName": "Bernhard",
		"dateOfBirth": "1934-11-02T00:22:14.000Z",
		"createdAt": "2023-07-01T09:40:29.000Z",
		"updatedAt": "2023-07-01T09:40:29.000Z"
	}
]
```

### Item Routes

You must be logged in to add, update, or delete items.

| Method | Result | Route       | Headers                | Body |
| :----- | :----- | :---------- | :--------------------- | :--- |
| GET    | All    | `/item`     | none                   | none |
| GET    | One    | `/item/:id` | none                   | none |
| POST   | New    | `/item`     | Authorization: `token` | JSON |
| PUT    | Update | `/item/:id` | Authorization: `token` | JSON |
| DELETE | Delete | `/item/:id` | Authorization: `token` | none |

#### **Example**

```js
// Request

const getItems = async () => {
	const baseurl = process.env.BASE_URL;

	try {
		const res = await fetch(baseurl + '/api/item');
		const data = await res.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};
```

```json
// Response

[
	{
		"id": 2,
		"name": "Burger",
		"createdAt": "2023-07-01T08:26:25.000Z",
		"updatedAt": "2023-07-01T08:26:25.000Z"
	},
	{
		"id": 3,
		"name": "Chicken Nuggets",
		"createdAt": "2023-07-01T08:26:25.000Z",
		"updatedAt": "2023-07-01T08:26:25.000Z"
	}
]
```

### Order Routes

You must be logged in to access all order data.

| Method | Result | Route        | Headers                | Body |
| :----- | :----- | :----------- | :--------------------- | :--- |
| GET    | All    | `/order`     | Authorization: `token` | none |
| GET    | One    | `/order/:id` | Authorization: `token` | none |
| POST   | New    | `/order`     | Authorization: `token` | JSON |
| PUT    | Update | `/order/:id` | Authorization: `token` | JSON |
| DELETE | Delete | `/order/:id` | Authorization: `token` | none |

#### **Example**

```js
// Request

const getOrders = async (token) => {
	const baseurl = process.env.BASE_URL;

	const options = {
		headers: {
			Authorization: token
		}
	};

	try {
		const res = await fetch(baseurl + '/api/order', options);
		const data = await res.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};
```

```json
// Response

[
	{
		"id": 1,
		"CustomerId": 10,
		"ShiftId": 3,
		"createdAt": "2023-07-01T09:40:29.000Z",
		"updatedAt": "2023-07-01T09:40:29.000Z"
	},
	{
		"id": 2,
		"CustomerId": 9,
		"ShiftId": 5,
		"createdAt": "2023-07-01T09:40:29.000Z",
		"updatedAt": "2023-07-01T09:40:29.000Z"
	}
]
```

### Shift Routes

You must be logged in to access all shift data.

| Method | Result | Route        | Headers                | Body |
| :----- | :----- | :----------- | :--------------------- | :--- |
| GET    | All    | `/shift`     | Authorization: `token` | none |
| GET    | One    | `/shift/:id` | Authorization: `token` | none |
| POST   | New    | `/shift`     | Authorization: `token` | JSON |
| PUT    | Update | `/shift/:id` | Authorization: `token` | JSON |
| DELETE | Delete | `/shift/:id` | Authorization: `token` | none |

#### **Example**

```js
// Request

const getShifts = async (token) => {
	const baseurl = process.env.BASE_URL;

	const options = {
		headers: {
			Authorization: token
		}
	};

	try {
		const res = await fetch(baseurl + '/api/shift', options);
		const data = await res.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};
```

```json
// Response

[
	{
		"id": 1,
		"date": "2023-07-01",
		"createdAt": "2023-07-01T09:40:29.000Z",
		"updatedAt": "2023-07-01T09:40:29.000Z"
	},
	{
		"id": 2,
		"date": "2023-06-30",
		"createdAt": "2023-07-01T09:40:29.000Z",
		"updatedAt": "2023-07-01T09:40:29.000Z"
	}
]
```

# Credits

[Joe Rehfuss](https://github.com/Rufasa85)<br>
Creator / Tech Lead

[Henry Weigand](https://github.com/hcweigand10)<br>
Developer

[Eli Wood](https://github.com/MrEliWood)<br>
Developer

# Questions

[Rufasa85 on GitHub](https://github.com/Rufasa85)

<!-- styling for html elements -->
<link rel="stylesheet" href="./public/styles/readme.css">
