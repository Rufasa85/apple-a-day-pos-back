# apple-a-day-pos-back

## Description

Backend for the Apple A Day point of sale system.

<br>

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

<br>
<br>

# Installation

<br>

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

<br>

## Environment Variables

```
DB_NAME=apple_a_day_pos_db
DB_USER=root
DB_PASSWORD=password

APP_PASSWORD=tacocat
JWT_SECRET=tacocat
```

Environment variables are used to store information that differs between local and deployed environments.

<br>

Create a `.env` file at the root of this directory. Your file structure should look something like this:

> apple-a-day-pos-back<br>
> ├ config<br>
> ├ controllers<br>
> ├ db<br>
> ├ models<br>
> ├ node_modules<br>
> ├ public<br>
> ├ seed<br>
> ├ `.env`<br>
> ├ .gitignore<br>
> ├ cors.json<br>
> ├ package-lock.json<br>
> ├ package.json<br>
> ├ README.md<br>
> └ server.js<br>

<br>

Add the following variables to the file:

| Variable       | Value                | Description                                              |
| :------------- | :------------------- | :------------------------------------------------------- |
| `DB_NAME`      | `apple_a_day_pos_db` | The name of your local database                          |
| `DB_USER`      | `root` (probably)    | Your local MySql user name - often "root"                |
| `DB_PASSWORD`  | **\*\*\*\*\*\*\*\*** | Your local MySql password                                |
| `APP_PASSWORD` | **\*\*\*\*\*\*\*\*** | Hard coded password for user login                       |
| `JWT_SECRET`   | **\*\*\*\*\*\*\*\*** | A passphrase used for signing and decoding jsonwebtokens |

<br>

## Database

```bash
npm run resetdb
```

This script drops the **apple_a_day_pos_db** database, if it exists, then creates a new one.

<br>

## Seeds

```bash
npm run seed
```

> **Warning**
> Running this script will reset your database, deleting any existing data.

<br>

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

<br>

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

<br>
<br>

# Usage

## Start the Server

```bash
npm start
```

This script runs `server.js` which spins up the express server, syncs the database, and logs the port number.

<br>

### Development Server

```bash
npm run dev
```

This script runs `server.js` with [nodemon](https://www.npmjs.com/package/nodemon) which restarts the server on every file save.

<br>

## Routes

```
/api
```

All routes start with `/api`.

<br>

### User Routes

There is one user route for logging in.

| Method | Result | Route          | Headers | Body |
| :----- | :----- | :------------- | :------ | :--- |
| POST   | Login  | `/users/login` | none    | JSON |

<br>

#### **Example Request**

```js
const login = async () => {
	const baseurl = process.env.BASE_URL;

	const options = {
		method: 'POST',
		body: JSON.stringify({ password: 'secret' })
	};

	try {
		const res = await fetch(baseurl + '/api/users/login', options);
		const data = await res.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};
```

<br>

#### **Example Response**

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

<br>

### Customer Routes

You must be logged in to access all customer data.

| Method | Result | Route            | Headers                | Body |
| :----- | :----- | :--------------- | :--------------------- | :--- |
| GET    | All    | `/customers`     | Authorization: `token` | none |
| GET    | One    | `/customers/:id` | Authorization: `token` | none |
| POST   | New    | `/customers`     | Authorization: `token` | JSON |
| PUT    | Update | `/customers/:id` | Authorization: `token` | JSON |
| DELETE | Delete | `/customers/:id` | Authorization: `token` | none |

<br>

#### **Example Request**

```js
const getCustomers = async (token) => {
	const baseurl = process.env.BASE_URL;

	const options = {
		headers: {
			Authorization: token
		}
	};

	try {
		const res = await fetch(baseurl + '/api/customers', options);
		const data = await res.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};
```

<br>

#### **Example Response**

```json
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

<br>

### Item Routes

You must be logged in to add, update, or delete items.

| Method | Result | Route        | Headers                | Body |
| :----- | :----- | :----------- | :--------------------- | :--- |
| GET    | All    | `/items`     | none                   | none |
| GET    | One    | `/items/:id` | none                   | none |
| POST   | New    | `/items`     | Authorization: `token` | JSON |
| PUT    | Update | `/items/:id` | Authorization: `token` | JSON |
| DELETE | Delete | `/items/:id` | Authorization: `token` | none |

<br>

#### **Example Request**

```js
const getItems = async () => {
	const baseurl = process.env.BASE_URL;

	try {
		const res = await fetch(baseurl + '/api/items');
		const data = await res.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};
```

<br>

#### **Example Response**

```json
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

<br>

### Order Routes

You must be logged in to access all order data.

| Method | Result | Route         | Headers                | Body |
| :----- | :----- | :------------ | :--------------------- | :--- |
| GET    | All    | `/orders`     | Authorization: `token` | none |
| GET    | One    | `/orders/:id` | Authorization: `token` | none |
| POST   | New    | `/orders`     | Authorization: `token` | JSON |
| PUT    | Update | `/orders/:id` | Authorization: `token` | JSON |
| DELETE | Delete | `/orders/:id` | Authorization: `token` | none |

<br>

#### **Example Request**

```js
const getOrders = async (token) => {
	const baseurl = process.env.BASE_URL;

	const options = {
		headers: {
			Authorization: token
		}
	};

	try {
		const res = await fetch(baseurl + '/api/orders', options);
		const data = await res.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};
```

<br>

#### **Example Response**

```json
[
	{
		"id": 1,
		"CustomerId": null,
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

<br>

### Shift Routes

You must be logged in to access all shift data.

| Method | Result | Route         | Headers                | Body |
| :----- | :----- | :------------ | :--------------------- | :--- |
| GET    | All    | `/shifts`     | Authorization: `token` | none |
| GET    | One    | `/shifts/:id` | Authorization: `token` | none |
| POST   | New    | `/shifts`     | Authorization: `token` | JSON |
| PUT    | Update | `/shifts/:id` | Authorization: `token` | JSON |
| DELETE | Delete | `/shifts/:id` | Authorization: `token` | none |

<br>

#### **Example Request**

```js
const getShifts = async (token) => {
	const baseurl = process.env.BASE_URL;

	const options = {
		headers: {
			Authorization: token
		}
	};

	try {
		const res = await fetch(baseurl + '/api/shifts', options);
		const data = await res.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};
```

<br>

#### **Example Response**

```json
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

<br>
<br>

# Credits

[Joe Rehfuss](https://github.com/Rufasa85)<br>
Creator / Tech Lead

[Henry Weigand](https://github.com/hcweigand10)<br>
Developer

[Eli Wood](https://github.com/MrEliWood)<br>
Developer

<br>
<br>

# Questions

[Rufasa85 on GitHub](https://github.com/Rufasa85)
