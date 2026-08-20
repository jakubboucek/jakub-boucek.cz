import './style.scss';

// Vanilla replacement for jQuery's slideToggle(), height-based, 200 ms
const slideStates = new WeakMap();

function slideToggle(el, duration = 200) {
	el.getAnimations().forEach((animation) => animation.cancel());
	// Track the logical state, computed display lies while animating
	const state = slideStates.get(el) ?? { shown: getComputedStyle(el).display !== 'none' };
	slideStates.set(el, state);
	clearTimeout(state.timer);
	state.shown = !state.shown;
	if (state.shown) {
		el.style.display = '';
		if (getComputedStyle(el).display === 'none') {
			el.style.display = 'block';
		}
	}
	const keyframes = [
		{ height: '0px', overflow: 'hidden' },
		{ height: `${el.scrollHeight}px`, overflow: 'hidden' },
	];
	const animation = el.animate(state.shown ? keyframes : keyframes.reverse(), {
		duration,
		easing: 'ease-in-out',
	});
	const shown = state.shown;
	const finalize = () => {
		clearTimeout(state.timer);
		if (!shown) {
			el.style.display = 'none';
		}
	};
	// Finish events don't fire in hidden documents, the timer guarantees
	// the end state is applied either way (finalize is idempotent)
	animation.onfinish = finalize;
	state.timer = setTimeout(finalize, duration + 50);
}

const bankBox = document.getElementById('bank-box');
if (bankBox) {
	const button = bankBox.querySelector('#bank-show-more');
	const icons = button.querySelectorAll('svg');
	const rows = bankBox.querySelectorAll('.no-more, .only-more');

	button.addEventListener('click', () => {
		icons.forEach((icon) => icon.classList.toggle('d-none'));
		rows.forEach((el) => slideToggle(el));
	});
}
