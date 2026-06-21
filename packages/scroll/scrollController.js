class ScrollController {
    constructor(view) {
        this.#view = view;

        this.#bindViewEvents();
    }

    #view;

    bindScrollEndPage({ onScrollEndPage }) {
        this.bindScroll({ onScrollEndPage: onScrollEndPage });
    }

    setPositionTop() {
        window.scrollTo(0, 0);
    }

    scrollTop = () => {
        this.scrollTo();
    }

    scrollTo = (toElement, speed = 1000) =>  {
        this.#view.scrollTo({ toElement: toElement, speed: speed });
    }

    getScrollXY = function() {
        if (window.pageYOffset != undefined) {
            return [pageXOffset, pageYOffset];
        } else {
            var sx, sy, d = document,
                r = d.documentElement,
                b = d.body;
            sx = r.scrollLeft || b.scrollLeft || 0;
            sy = r.scrollTop || b.scrollTop || 0;
            return [sx, sy];
        }
    }

    setPosition = (pageX, pageY) => {
        window.scrollTo(pageX, pageY);
    }

    setPositionTop() {
        window.scrollTo(0, 0);
    }

    bindScroll({ onScrollEndPage, onScrollUp, onScrollDown }) {
        const that = this;

        window.addEventListener("scroll", throttle(checkScrollPosition));
        window.addEventListener("resize", throttle(checkScrollPosition));

        function checkScrollPosition() {
            // Нам потребуется знать высоту документа и высоту экрана.
            const height = document.body.offsetHeight;
            const screenHeight = window.innerHeight;
            
            // Они могут отличаться: если на странице много контента,
            // высота документа будет больше высоты экрана (отсюда и скролл).
            
            // Записываем, сколько пикселей пользователь уже проскроллил.
            const scrolled = window.scrollY;
            
            // Обозначим порог, по приближении к которому
            // будем вызывать какое-то действие.
            // В нашем случае — экран страницы / значение.
            const threshold = height - screenHeight / 2;
            
            // Отслеживаем, где находится низ экрана относительно страницы.
            const position = scrolled + screenHeight;
            
            if (position >= threshold) {
                // Если мы пересекли полосу-порог, вызываем нужное действие.
                onScrollEndPage();
            }

            checkScrollDirection();

            function checkScrollDirection() {
                let lastScrollTop = 0;
                let scrollOffsetToShowBtnUp = 3000;
                let currentScrollOffsetUp = 0;
                let startScrollUpStartPosition = 0;

                // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426".
                var scrollPositionCurrent = window.pageYOffset || document.documentElement.scrollTop;

                // If down direction scroll.
                if (window.pageYOffset === 0 || scrollPositionCurrent > lastScrollTop) {
                    that.#view.btnScrollUpHide();
                    currentScrollOffsetUp = 0;
                    startScrollUpStartPosition = 0;
                    if (onScrollDown) onScrollDown();
                } 
                // If up direction scroll
                else if (scrollPositionCurrent < lastScrollTop) {
                    if (startScrollUpStartPosition - scrollPositionCurrent >= scrollOffsetToShowBtnUp) that.#view.btnScrollUpShow();
                    
                    if (startScrollUpStartPosition === 0) startScrollUpStartPosition = scrollPositionCurrent;
                    if (onScrollUp) onScrollUp();
                }

                // For Mobile or negative scrolling.
                lastScrollTop = scrollPositionCurrent <= 0 ? 0 : scrollPositionCurrent; 
            }
        }

        function throttle(callee, timeout) {
            let timer = null
        
            return function perform(...args) {
                if (timer) return
            
                timer = setTimeout(() => {
                    callee(...args)
            
                    clearTimeout(timer)
                    timer = null
                }, timeout);
            }
        }
    }

    #bindViewEvents() {
        this.#view.bindClickBtnScrollUp(this.scrollTop);
    }
}
