class ModalBoxView {
    constructor({ containerId }) {
        this.#domContainer = document.getElementById(containerId);

        if ( ! this.#domContainer) {
            throw new Error(`Контейнер с id "${this.#domContainer}" не найден`);
        }

        // Get the modal
        this.#modal = this.#domContainer.querySelector("#modalBox");

        // Get the modal-content
        this.#modalContent = this.#domContainer.querySelectorAll(".modal-content")[0];

        // Get the <span> element that closes the modal
        this.#btnClose = this.#domContainer.querySelectorAll(".close")[0];
        
        this.bindClickBtnClose(() => this.hide());
    }

    #domContainer;

    // Get the modal
    #modal;

    // Get the modal-content
    #modalContent;

    // Get the <span> element that closes the modal
    #btnClose;


    show(parameter = { bodyText: '', headerText: '', footerText: '', isPossibleClose: true }) {
        const defaultParameter = {
            bodyText: '',
            headerText: '',
            footerText: '',
            isPossibleClose: true
        };

        let bodyText = parameter.bodyText != undefined ? parameter.bodyText : defaultParameter.bodyText;
        let headerText = parameter.headerText != undefined ? parameter.headerText : defaultParameter.headerText;
        let footerText = parameter.footerText != undefined ? parameter.footerText : defaultParameter.footerText;
        let isPossibleClose = parameter.isPossibleClose != undefined ? parameter.isPossibleClose : defaultParameter.isPossibleClose;

        if (isPossibleClose) {
            $('.modal-close').show();
            this.bindClickOutsideModal(() => this.hide());
        } else {
            $('.modal-close').hide();
            this.bindClickOutsideModal();
        }
        if (headerText) { 
            $('.modal-header-text').html(headerText);
            $('.modal-header-text').show();
        } else { 
            $('.modal-header-text').html('<h2></h2>');
        }
        if (bodyText) {
            $('.modal-body').html(bodyText);
            $('.modal-body').show();
        } else {
            $('.modal-body').hide();
        }
        if (footerText) {
            $('.modal-footer-text').html(footerText);
            $('.modal-footer').show();
        } else {
             $('.modal-footer').hide();
        }



        this.#modal.classList.remove('hide');
        this.#modalContent.classList.remove('hide');
        this.#modal.style.display = 'block';

    }

    hide() {
        this.#modalContent.classList.add('hide');
        this.#modal.classList.add('hide');    
        
        setTimeout(() => { this.#modal.style.display = 'none'; }, 450);
    }



    bindClickBtnClose(handler) {
        // When the user clicks on <span> (x), close the modal
        this.#btnClose.onclick = function() {
            handler();
        }
    }

    bindClickOutsideModal(handler) {
        const that = this;

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == that.#modal) {
                if (handler) handler();
            }
        }
    }
}