class DateManager {
    // Get date in format y_m_d.
    getDateNow(separator = '_') {
        const date = new Date();

        return date.getFullYear() + separator + 
            (((date.getMonth()+1) < 10)?'0':'') + (date.getMonth()+1) + separator +
            ((date.getDate() < 10)?'0':'') + date.getDate();
    }

    // Get time in format h_m_s.
    getTimeNow(separator = '_') {
        const date = new Date();

        return ((date.getHours() < 10)?'0':'') + date.getHours() + separator + 
            ((date.getMinutes() < 10)?'0':'') + date.getMinutes() + separator + 
            ((date.getSeconds() < 10)?'0':'') + date.getSeconds();
    }
}