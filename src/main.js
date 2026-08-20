import './style.scss';

// Bank box: all visibility and animation is CSS-driven by the .open class
const bankBox = document.getElementById('bank-box');
if (bankBox) {
	const button = bankBox.querySelector('#bank-show-more');
	button.addEventListener('click', () => {
		const open = bankBox.classList.toggle('open');
		button.setAttribute('aria-expanded', open);
	});
}
