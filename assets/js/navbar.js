export default class initNavbar {
    constructor(params) {
        const settings = {...{navbarListId: 'navbar__list', navbarItemsClass: 'navbar__item', activeSectionClass: 'active', clearIntervalTime: 700}, ...params};
        this.navbarList = document.querySelector(`#${settings.navbarListId}`);
        this.navbarItems = document.querySelectorAll(`.${settings.navbarItemsClass}`);
        this.activeClass = settings.activeSectionClass;
        this.clearIntervalTime = settings.clearIntervalTime;
    }
    
    _initProps() {
        this.screenHeight = window.screen.height;
        this.prevPosition = null;
        this.intervalID = null;
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
                if (this.prevItem && this.prevItem !== this.navbarItems[this.sectionPosition - 1]) this.prevItem.classList.toggle(this.activeClass);    
                this.prevItem = document.querySelector(`.${this.activeClass}`); 
            }

            this.prevSectionPosition = this.sectionPosition;
        }
    
        this.prevPosition = window.scrollY;
    }

    _goToNthSection(e) {
        e.preventDefault();
        this.blockID = null;
        
        for (let i = 0; !this.blockID; i++) {
            if (e.path[i].matches('.navbar__link')) {
                this.blockID = e.path[i].getAttribute('href');
            }
        }
    
        this.scrollTarget = document.querySelector(this.blockID);
        this.scrollTarget.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
    
        this.intervalID = setInterval(() => this._checkUserPosition(), 100);
        setTimeout(() => clearInterval(this.intervalID), this.clearIntervalTime);
    }


    init() {
        this._initProps();
        this._initDefaults();
        this._initListeners();
    }
}



