import './style.less';

// Vanilla replacement for jQuery's slideToggle(), height-based, 200 ms
function slideToggle(el, duration = 200) {
	el.getAnimations().forEach((animation) => animation.cancel());
	const isHidden = getComputedStyle(el).display === 'none';
	if (isHidden) {
		el.style.display = 'block';
	}
	const keyframes = [
		{ height: '0px', overflow: 'hidden' },
		{ height: `${el.scrollHeight}px`, overflow: 'hidden' },
	];
	const animation = el.animate(isHidden ? keyframes : keyframes.reverse(), {
		duration,
		easing: 'ease-in-out',
	});
	animation.onfinish = () => {
		if (!isHidden) {
			el.style.display = 'none';
		}
	};
}

const bankBox = document.getElementById('bank-box');
if (bankBox) {
	const button = bankBox.querySelector('#bank-show-more');
	const icon = button.querySelector('i.glyphicon');
	const rows = bankBox.querySelectorAll('.no-more, .only-more');

	button.addEventListener('click', () => {
		icon.classList.toggle('glyphicon-zoom-in');
		icon.classList.toggle('glyphicon-zoom-out');
		rows.forEach((el) => slideToggle(el));
	});
}
