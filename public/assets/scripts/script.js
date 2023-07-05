const modelNav = document.querySelectorAll('#model-nav .nav-item');
const routeNav = document.querySelectorAll('#route-nav .nav-item');
const details = document.querySelectorAll('.details');

const defaultModel = modelNav[0].dataset.model;
const defaultRoute = details[0].dataset.route;

let activeModel = defaultModel;
let activeRoute = defaultRoute;

console.log(defaultRoute);

const renderContent = (model, route) => {
	const allRoutesForModel = [];

	details.forEach((element) => {
		const modelName = element.dataset.model;
		const routeName = element.dataset.route;

		if (modelName === model) allRoutesForModel.push(routeName);
	});

	if (!allRoutesForModel.includes(route)) {
		activeRoute = allRoutesForModel[0];
		renderContent(model, activeRoute);
		return;
	}

	details.forEach((element) => {
		const modelName = element.dataset.model;
		const routeName = element.dataset.route;

		element.classList.remove('hidden');

		if (modelName !== model || routeName !== route) {
			element.classList.add('hidden');
		}
	});

	routeNav.forEach((element) => {
		const routeName = element.dataset.route;

		if (!allRoutesForModel.includes(routeName)) {
			element.classList.add('inactive');
		} else {
			element.classList.remove('inactive');
		}

		if (allRoutesForModel.includes(routeName) && routeName === route) {
			element.classList.add('active');
		} else {
			element.classList.remove('active');
		}
	});

	modelNav.forEach((element) => {
		const modelName = element.dataset.model;

		if (modelName === model) {
			element.classList.add('active');
		} else {
			element.classList.remove('active');
		}
	});
};

const handleNavClick = (e) => {
	activeModel = e.target.dataset.model || activeModel;
	activeRoute = e.target.dataset.route || activeRoute;

	renderContent(activeModel, activeRoute);
};

for (const modelNavItem of modelNav) {
	modelNavItem.addEventListener('click', handleNavClick, true);
}

for (const routeNavItem of routeNav) {
	routeNavItem.addEventListener('click', handleNavClick, true);
}

console.log(activeRoute);

renderContent(activeModel, activeRoute);
