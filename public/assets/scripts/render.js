const models = {
	users: {
		post: {
			route: '/users/login',
			headers: null,
			body: {
				password: '********'
			},
			response: {
				token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
			}
		}
	},

	customers: {
		get: {
			all: {
				route: '/customers',
				headers: {
					Authorization: 'token'
				},
				body: null,
				response: [
					{
						id: 2,
						firstName: 'Franz',
						lastName: 'Anderson',
						dateOfBirth: '1945-12-29T18:37:59.000Z',
						createdAt: '2023-07-01T09:40:29.000Z',
						updatedAt: '2023-07-01T09:40:29.000Z'
					},
					{
						id: 8,
						firstName: 'Herminio',
						lastName: 'Bernhard',
						dateOfBirth: '1934-11-02T00:22:14.000Z',
						createdAt: '2023-07-01T09:40:29.000Z',
						updatedAt: '2023-07-01T09:40:29.000Z'
					}
				]
			},

			one: {
				route: '/customers/:id',
				headers: {
					Authorization: 'token'
				},
				body: null,
				response: {
					id: 2,
					firstName: 'Franz',
					lastName: 'Anderson',
					dateOfBirth: '1945-12-29T18:37:59.000Z',
					createdAt: '2023-07-01T09:40:29.000Z',
					updatedAt: '2023-07-01T09:40:29.000Z',
					Orders: [
						{
							id: 8,
							CustomerId: 2,
							ShiftId: 4,
							createdAt: '2023-07-01T09:40:29.000Z',
							updatedAt: '2023-07-01T09:40:29.000Z',
							Customer: {},
							Shift: {},
							Items: []
						}
					]
				}
			}
		},

		post: {
			route: '/customers',
			headers: {
				Authorization: 'token'
			},
			body: {
				firstName: 'Hilton',
				lastName: 'Gerlach',
				dateOfBirth: new Date('4/27/2007')
			},
			response: {
				message: 'Customer created!',
				customer: {
					id: 10,
					firstName: 'Hilton',
					lastName: 'Gerlach',
					dateOfBirth: '2007-04-27T03:04:06.000Z',
					createdAt: '2023-07-01T09:40:29.000Z',
					updatedAt: '2023-07-01T09:40:29.000Z'
				}
			}
		},

		put: {
			route: '/customers/:id',
			headers: {
				Authorization: 'token'
			},
			body: {
				dateOfBirth: new Date('4/27/1997')
			},
			response: {
				message: 'Customer updated!',
				customer: {
					id: 10,
					firstName: 'Hilton',
					lastName: 'Gerlach',
					dateOfBirth: '2007-04-27T03:04:06.000Z',
					createdAt: '2023-07-01T09:40:29.000Z',
					updatedAt: '2023-07-03T09:40:29.000Z'
				}
			}
		},

		delete: {
			route: '/customers/:id',
			headers: {
				Authorization: 'token'
			},
			body: null,
			response: {
				message: 'Customer deleted!',
				customer: {
					id: 10,
					firstName: 'Hilton',
					lastName: 'Gerlach',
					dateOfBirth: '2007-04-27T03:04:06.000Z',
					createdAt: '2023-07-01T09:40:29.000Z',
					updatedAt: '2023-07-05T09:40:29.000Z'
				}
			}
		}
	},

	items: {
		get: {
			all: {
				route: '/items',
				headers: null,
				body: null,
				response: [
					{
						id: 2,
						name: 'Burger',
						createdAt: '2023-07-01T08:26:25.000Z',
						updatedAt: '2023-07-01T08:26:25.000Z'
					},
					{
						id: 3,
						name: 'Chicken Nuggets',
						createdAt: '2023-07-01T08:26:25.000Z',
						updatedAt: '2023-07-01T08:26:25.000Z'
					}
				]
			},

			one: {
				route: 'items/:id',
				headers: null,
				body: null,
				response: {
					id: 1,
					name: 'Pizza',
					createdAt: '2023-07-01T09:40:29.000Z',
					updatedAt: '2023-07-01T09:40:29.000Z',
					Shifts: [
						{
							id: 4,
							date: '2023-06-28',
							createdAt: '2023-07-01T09:40:29.000Z',
							updatedAt: '2023-07-01T09:40:29.000Z',
							ShiftItem: {}
						}
					],
					Orders: [
						{
							id: 5,
							CustomerId: 2,
							ShiftId: 1,
							createdAt: '2023-07-01T09:40:29.000Z',
							updatedAt: '2023-07-01T09:40:29.000Z',
							OrderItem: {}
						}
					]
				}
			}
		},

		post: {
			route: '/items',
			headers: {
				Authorization: 'token'
			},
			body: {
				name: 'Fries'
			},
			response: {
				message: 'Item created!',
				item: {
					id: 4,
					name: 'Fries',
					createdAt: '2023-07-01T08:26:25.000Z',
					updatedAt: '2023-07-01T08:26:25.000Z'
				}
			}
		},

		put: {
			route: '/items/:id',
			headers: {
				Authorization: 'token'
			},
			body: {
				name: 'French Fries'
			},
			response: {
				message: 'Item updated!',
				item: {
					id: 4,
					name: 'French Fries',
					createdAt: '2023-07-01T08:26:25.000Z',
					updatedAt: '2023-07-03T08:26:25.000Z'
				}
			}
		},

		delete: {
			route: '/items/:id',
			headers: {
				Authorization: 'token'
			},
			body: null,
			response: {
				message: 'Item deleted!',
				item: {
					id: 4,
					name: 'French Fries',
					createdAt: '2023-07-01T08:26:25.000Z',
					updatedAt: '2023-07-05T08:26:25.000Z'
				}
			}
		}
	},

	orders: {
		get: {
			all: {
				route: '/orders',
				headers: {
					Authorization: 'token'
				},
				body: null,
				response: [
					{
						id: 1,
						CustomerId: null,
						ShiftId: 3,
						createdAt: '2023-07-01T09:40:29.000Z',
						updatedAt: '2023-07-01T09:40:29.000Z'
					},
					{
						id: 2,
						CustomerId: 9,
						ShiftId: 5,
						createdAt: '2023-07-01T09:40:29.000Z',
						updatedAt: '2023-07-01T09:40:29.000Z'
					}
				]
			},

			one: {
				route: 'orders/:id',
				headers: null,
				body: null,
				response: {
					id: 1,
					CustomerId: 10,
					ShiftId: 3,
					createdAt: '2023-07-01T09:40:29.000Z',
					updatedAt: '2023-07-01T09:40:29.000Z',
					Customer: {},
					Shift: {},
					Items: []
				}
			}
		},

		post: {
			route: '/orders',
			headers: {
				Authorization: 'token'
			},
			body: {
				CustomerId: 12,
				ShiftId: 5
			},
			response: {
				message: 'Order created!',
				order: {
					id: 3,
					CustomerId: 12,
					ShiftId: 5,
					createdAt: '2023-07-01T09:40:29.000Z',
					updatedAt: '2023-07-01T09:40:29.000Z'
				}
			}
		},

		put: {
			route: '/orders/:id',
			headers: {
				Authorization: 'token'
			},
			body: {
				CustomerId: 11
			},
			response: {
				message: 'Order updated!',
				order: {
					id: 3,
					CustomerId: 11,
					ShiftId: 5,
					createdAt: '2023-07-01T09:40:29.000Z',
					updatedAt: '2023-07-03T09:40:29.000Z'
				}
			}
		},

		delete: {
			route: '/orders/:id',
			headers: {
				Authorization: 'token'
			},
			body: null,
			response: {
				message: 'Order deleted!',
				order: {
					id: 3,
					CustomerId: 11,
					ShiftId: 5,
					createdAt: '2023-07-01T09:40:29.000Z',
					updatedAt: '2023-07-05T09:40:29.000Z'
				}
			}
		}
	},

	shifts: {
		get: {
			all: {
				route: '/shifts',
				headers: {
					Authorization: 'token'
				},
				body: null,
				response: [
					{
						id: 1,
						date: '2023-07-01',
						createdAt: '2023-07-01T09:40:29.000Z',
						updatedAt: '2023-07-01T09:40:29.000Z'
					},
					{
						id: 2,
						date: '2023-06-30',
						createdAt: '2023-07-01T09:40:29.000Z',
						updatedAt: '2023-07-01T09:40:29.000Z'
					}
				]
			},

			one: {
				route: 'shifts/:id',
				headers: null,
				body: null,
				response: {
					id: 1,
					date: '2023-07-01',
					createdAt: '2023-07-01T09:40:29.000Z',
					updatedAt: '2023-07-01T09:40:29.000Z',
					Orders: [],
					Items: []
				}
			}
		},

		post: {
			route: '/shifts',
			headers: {
				Authorization: 'token'
			},
			body: {
				date: new Date('7/2/2023')
			},
			response: {
				message: 'Shift created!',
				shift: {
					id: 3,
					date: '2023-07-02',
					createdAt: '2023-07-01T09:40:29.000Z',
					updatedAt: '2023-07-01T09:40:29.000Z'
				}
			}
		},

		put: {
			route: '/shifts/:id',
			headers: {
				Authorization: 'token'
			},
			body: {
				date: new Date('7/3/2023')
			},
			response: {
				message: 'Shift updated!',
				shift: {
					id: 3,
					date: '2023-07-03',
					createdAt: '2023-07-01T09:40:29.000Z',
					updatedAt: '2023-07-03T09:40:29.000Z'
				}
			}
		},

		delete: {
			route: '/shifts/:id',
			headers: {
				Authorization: 'token'
			},
			body: null,
			response: {
				message: 'Shift deleted!',
				shift: {
					id: 3,
					date: '2023-07-03',
					createdAt: '2023-07-01T09:40:29.000Z',
					updatedAt: '2023-07-05T09:40:29.000Z'
				}
			}
		}
	}
};

const generateHtml = (model, method, route, data) => {
	const id = route ? `${model}-${method}-${route}` : `${model}-${method}`;
	const main = document.createElement('main');

	main.setAttribute('id', id);
	main.setAttribute('class', 'details');
	main.setAttribute('data-model', model);
	main.setAttribute('data-route', method);

	route && main.setAttribute('data-sub', route);

	main.innerHTML = `<header className="details-header">
    <section className="details-section">
        <code id="${id}-route-text" className="route-path">
            <span>/</span>api${data.route.replaceAll('/', '<span>/</span>')}</code>

        <div className="tooltip">
            <button className="copy-to-clipboard-button">
                <span id="${id}-route-text-tooltip" className="tooltip-text">Copy to clipboard</span>

                <i className="fi fi-rr-copy-alt" data-reference="${id}-route-text"></i>
            </button>
        </div>
    </section>
</header>

<main className="details-main">
    <section className="details-section">
        <header className="details-section-header">
            <h3 className="details-section-header-heading">Headers</h3>
            <h3 className="details-section-header-type">${data.headers ? 'JSON' : 'None'}</h3>
        </header>
        ${
				data.headers
					? `<main className="details-section-main">
            <pre><code id="${id}-header-text">${data.headers ? JSON.stringify(data.headers, null, 2) : ''}</code></pre>

            <div className="tooltip">
                <button className="copy-to-clipboard-button">
                    <span id="${id}-header-text-tooltip" className="tooltip-text">Copy to clipboard</span>

                    <i className="fi fi-rr-copy-alt" data-reference="${id}-header-text"></i>
                </button>
            </div>
        </main>`
					: ''
			}
    </section>

    <section id="${id}-body" className="details-section">
        <header className="details-section-header">
            <h3 className="details-section-header-heading">Body</h3>
            <h3 className="details-section-header-type">${data.body ? 'JSON' : 'None'}</h3>
        </header>

        ${
				data.body
					? `<main className="details-section-main">
        <pre><code id="${id}-body-text">${data.body ? JSON.stringify(data.body, null, 2) : ''}</code></pre>

        <div className="tooltip">
            <button className="copy-to-clipboard-button">
                <span id="${id}-body-text-tooltip" className="tooltip-text">Copy to clipboard</span>

                <i className="fi fi-rr-copy-alt" data-reference="${id}-body-text"></i>
            </button>
        </div>
    </main>`
					: ''
			}
    </section>

    <section id="${id}-response" className="details-section">
        <header className="details-section-header">
            <h3 className="details-section-header-heading">Response</h3>
            <h3 className="details-section-header-type">${data.response ? 'JSON' : 'None'}</h3>
        </header>

        ${
				data.response
					? `<main className="details-section-main">
    <pre><code id="${id}-response-text">${data.response ? JSON.stringify(data.response, null, 2) : ''}</code></pre>

    <div className="tooltip">
        <button className="copy-to-clipboard-button">
            <span id="${id}-response-text-tooltip" className="tooltip-text">Copy to clipboard</span>

            <i className="fi fi-rr-copy-alt" data-reference="${id}-response-text"></i>
        </button>
    </div>
</main>`
					: ''
			}
    </section>
</main>`;

	document.body.appendChild(main);
};

for (const model in models) {
	const methods = models[model];

	for (const method in methods) {
		const routes = methods[method];
		const isSingleRoute = routes.route ? true : false;

		if (isSingleRoute) {
			generateHtml(model, method, null, routes);
		} else {
			for (const route in routes) {
				const data = routes[route];
				generateHtml(model, method, route, data);
			}
		}
	}
}
