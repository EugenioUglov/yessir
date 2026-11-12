class DropdownManager {
    setOptions = function(dropdown, options) {
        for (let x in options) {
            let indexAddElement = dropdown.options.length;
            dropdown.options[indexAddElement] = new Option(options[x], options[x]);
            dropdown.options[indexAddElement].value = x;
        }
    }
}