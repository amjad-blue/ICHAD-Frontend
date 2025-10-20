document.addEventListener('DOMContentLoaded', init)


function init() {
	handleHomePage()
}


function handleHomePage() {
	if (document.querySelector('.homepage')) {

		const headerHeight = document.querySelector('.header').offsetHeight;
		document.documentElement.style.setProperty('--headerHeight', `${headerHeight}px`);

		// add hero swiper
		const heroSwiper = new Swiper(".hero-swiper", {
			slidesPerView: 1,
			spaceBetween: 20,
			effect: "fade",
			loop: true,
			fadeEffect: {
				crossFade: true,
			},
			speed: 600,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				bulletClass: 'swiper-pagination-bullet',
				bulletActiveClass: 'swiper-pagination-bullet-active',
			},
		});

		// Initialize video controls
		initVideoControls();

		// Initialize scroll header functionality
		initScrollHeader();

		// Initialize card title height equalization
		initCardTitleHeights();

	}
}

function initCardTitleHeights() {
	const cardTitles = document.querySelectorAll(".analysis-section .card-link .card-title");
	if (cardTitles.length === 0) return;

	let maxValue = 0;
	cardTitles.forEach(item => {
		if (item.offsetHeight > maxValue) maxValue = item.offsetHeight;
	});
	
	cardTitles.forEach(item => {
		item.style.minHeight = maxValue + "px";
	});
}


function initVideoControls() {
	const video = document.querySelector('video');
	const playButton = document.querySelector('.play-button');
	const muteButton = document.querySelector('.mute-button');

	if (!video || !playButton || !muteButton) return;

	// Remove default controls
	video.removeAttribute('controls');

	// Play/Pause functionality
	playButton.addEventListener('click', () => {
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	});

	// Mute/Unmute functionality
	muteButton.addEventListener('click', () => {
		video.muted = !video.muted;
	});

	// Update play button class based on video state
	function updatePlayButton() {
		if (video.paused) {
			playButton.classList.remove('playing');
		} else {
			playButton.classList.add('playing');
		}
	}

	// Update mute button class based on video state
	function updateMuteButton() {
		if (video.muted) {
			muteButton.classList.add('muted');
		} else {
			muteButton.classList.remove('muted');
		}
	}

	// Listen for video events to update button classes
	video.addEventListener('play', updatePlayButton);
	video.addEventListener('pause', updatePlayButton);
	video.addEventListener('volumechange', updateMuteButton);

	// Initialize button states
	updatePlayButton();
	updateMuteButton();
}

function initScrollHeader() {
	const header = document.querySelector('.header');
	
	if (!header) return;

	// Function to handle scroll
	function handleScroll() {
		const scrollY = window.scrollY;
		
		if (scrollY > 100) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	}

	// Add scroll event listener
	window.addEventListener('scroll', handleScroll);
	
	// Initialize on load
	handleScroll();
}

