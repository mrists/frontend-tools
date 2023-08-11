const SECTION_NAMES = {
	HEADER: '#header',
	HTML: '#html',
	CSS: '#css',
	JAVASCRIPT: '#javascript',
	FRONTEND: '#frontend'
}

export default class initNavbar {
	constructor(params) {
		const settings = {
			...{
				navbarListId: 'navbar__list',
				navbarItemsClass: 'navbar__item',
				activeSectionClass: 'active',
				clearIntervalTime: 700,
			},
			...params,
		};
		this.navbarList = document.querySelector(`#${settings.navbarListId}`);
		this.navbarItems = document.querySelectorAll(`.${settings.navbarItemsClass}`);
		this.activeClass = settings.activeSectionClass;
		this.clearIntervalTime = settings.clearIntervalTime;
	}

	_initProps() {
		this.screenHeight = window.screen.height;
		this.prevPosition = null;
		this.prevSectionPosition = 1;
	}

	_initDefaults() {
		this.sectionPosition = Math.round((window.scrollY + this.screenHeight) / this.screenHeight);
		this.navbarItems[this.sectionPosition - 1].classList.toggle(this.activeClass);
		this.prevItem = document.querySelector(`.${this.activeClass}`);
	}

	_initListeners() {
		document.body.addEventListener('wheel', this._checkUserPosition.bind(this));
		this.navbarList.addEventListener('click', this._goToNthSection.bind(this));
	}

	_checkUserPosition() {
		if (window.scrollY !== this.prevPosition) {
			this.screenHeight = window.screen.height;
			this.sectionPosition = Math.round((window.scrollY + this.screenHeight) / this.screenHeight);

			if (this.sectionPosition !== this.prevSectionPosition) {
				this.navbarItems[this.sectionPosition - 1].classList.toggle(this.activeClass);

				if (this.prevItem && this.prevItem !== this.navbarItems[this.sectionPosition - 1]) {
					this.prevItem.classList.toggle(this.activeClass);
				}
				this.prevItem = document.querySelector(`.${this.activeClass}`);
			}

			this.prevSectionPosition = this.sectionPosition;
		}

		this.prevPosition = window.scrollY;
	}

	_goToNthSection(e) {
		e.preventDefault();
		let blockID;

		const sectionNumber = +e.target.getAttribute('data-scroll-to');

		switch (sectionNumber) {
			case 0:
				blockID = SECTION_NAMES.HEADER;
				break;
			case 1:
				blockID = SECTION_NAMES.HTML;
				break;
			case 2:
				blockID = SECTION_NAMES.CSS;
				break;
			case 3:
				blockID = SECTION_NAMES.JAVASCRIPT;
				break;
			case 4:
				blockID = SECTION_NAMES.FRONTEND;
				break;
		}

		document.addEventListener('wheel', this._preventScrolling, { passive: false });

		this.scrollTarget = document.querySelector(blockID);
		this.scrollTarget.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});

		const intervalID = setInterval(() => this._checkUserPosition(), 100);

		setTimeout(() => {
			clearInterval(intervalID);
			document.removeEventListener('wheel', this._preventScrolling);
		}, this.clearIntervalTime);
	}

	_preventScrolling(event) {
		event.preventDefault();
	}

	init() {
		this._initProps();
		this._initDefaults();
		this._initListeners();
	}
}
