const modelNav = document.querySelectorAll('#model-nav .nav-item');
const routeNav = document.querySelectorAll('#route-nav .nav-item');
const routeSubNav = document.querySelectorAll('#route-nav .sub-nav-item');
const details = document.querySelectorAll('.details');
const copyButtons = document.querySelectorAll('.copy-to-clipboard-button');

const defaultModel = modelNav[0].dataset.model;
const defaultRoute = details[0].dataset.route;
const defaultSub = details[0].dataset.sub || null;

let activeModel = defaultModel;
let activeRoute = defaultRoute;
let activeSub = defaultSub;

const renderContent = (model, route, sub) => {
	const allRoutesForModel = {};

	details.forEach((element) => {
		const modelName = element.dataset.model;
		const routeName = element.dataset.route;
		const subName = element.dataset.sub || null;

		if (allRoutesForModel[routeName] && subName) return allRoutesForModel[routeName].push(subName);

		if (modelName === model) allRoutesForModel[routeName] = [];
	});

	const allRouteNamesForModel = Object.keys(allRoutesForModel);

	if (!allRouteNamesForModel.includes(route)) {
		activeRoute = allRouteNamesForModel[0];
		renderContent(model, activeRoute, sub);
		return;
	}

	details.forEach((element) => {
		const modelName = element.dataset.model;
		const routeName = element.dataset.route;
		const subName = element.dataset.sub || null;

		element.classList.remove('hidden');

		if (modelName !== model || routeName !== route || subName !== sub) {
			element.classList.add('hidden');
		}
	});

	routeNav.forEach((element) => {
		const routeName = element.dataset.route;

		if (!allRouteNamesForModel.includes(routeName)) {
			element.classList.add('inactive');
		} else {
			element.classList.remove('inactive');
		}

		if (allRouteNamesForModel.includes(routeName) && routeName === route) {
			element.classList.add('active');
		} else {
			element.classList.remove('active');
		}

		if (routeName === route && sub) {
			element.dataset.sub = sub;

			const elementChildren = Object.values(element.children);

			elementChildren.forEach((child) => {
				child.dataset.sub = sub;
			});
		}
	});

	routeSubNav.forEach((element) => {
		const routeName = element.dataset.route;
		const subName = element.dataset.sub;

		if (sub === null) return;

		if (routeName === route) {
			element.classList.remove('active');
		}

		if (subName === sub) {
			element.classList.add('active');
		}
	});

	modelNav.forEach((element) => {
		const modelName = element.dataset.model;

		element.classList.remove('active');

		if (modelName === model) {
			element.classList.add('active');
		}
	});
};

const handleNavClick = (e) => {
	activeModel = e.target.dataset.model || activeModel;
	activeRoute = e.target.dataset.route || activeRoute;
	activeSub = e.target.dataset.sub || activeSub;

	renderContent(activeModel, activeRoute, activeSub);
};

const copyToClipboard = (e) => {
	e.preventDefault();

	if (e.type === 'copy') {
		const text = document.getSelection().toString();
		const formattedText = text[0] === '/' ? text.replace(/(\r\n|\n|\r)/gm, '') : text;

		navigator.clipboard.writeText(formattedText);
		return;
	}

	const id = e.target.dataset.reference;
	const text = document.getElementById(id).innerText;
	const formattedText = text[0] === '/' ? text.replace(/(\r\n|\n|\r)/gm, '') : text;
	const isRoute = id.includes('route');

	navigator.clipboard.writeText(isRoute ? formattedText : text);

	const tooltipText = document.getElementById(id + '-tooltip');
	tooltipText.textContent = 'Copied!';
	tooltipText.setAttribute('style', 'width: 80px; margin-left: -40px;');

	setTimeout(() => {
		tooltipText.textContent = 'Copy to clipboard';
		tooltipText.setAttribute('style', 'width: 150px; margin-left: -75px;');
	}, 2000);
};

for (const modelNavItem of modelNav) {
	modelNavItem.addEventListener('click', handleNavClick);
}

for (const routeNavItem of routeNav) {
	routeNavItem.addEventListener('click', handleNavClick);
}

for (const page of details) {
	page.addEventListener('copy', copyToClipboard);
}

for (const button of copyButtons) {
	button.addEventListener('click', copyToClipboard);
}

renderContent(activeModel, activeRoute, activeSub);
