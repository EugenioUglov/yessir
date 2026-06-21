class ScrollView {
    constructor() {
        
    }


    btnScrollUpShow() {
        $('#btn_scroll_up').show();
    }

    btnScrollUpHide() {
        $('#btn_scroll_up').hide();
    }

    bindClickBtnScrollUp(handler) {
        $('#btn_scroll_up').on('click', () => handler());
    }

    scrollTo = ({ toElement: toElement, speed = 1000 }) =>  {
        if(toElement === undefined || toElement === null) {
            // IF scroll on the top THEN return. 
            if (window.pageYOffset == 0) return;
    
            $('html, body').animate({scrollTop: '0px'}, speed);
            $('#btn_scroll_up').hide();
            
            return;
        }
    
        $('html, body').animate({
            // Class of the object to which do scrolling.
            scrollTop: toElement.offset().top  
        }, speed); 
    }
}