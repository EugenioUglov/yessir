class DialogWindow {
    constructor() {

    }

    confirmAlert(text, callBackOk, onCancel) {
        const is_confirmed = confirm(text);
        
        if (is_confirmed == true) {
            callBackOk();
        } else {
            onCancel();
        }
    }
}