document.addEventListener('click', e => {
    //creates a variable if the target matches the data attribute
    const isDropDownButton = e.target.matches("[data-dropdown-button]");
    
    // Logic: Are we clicking on the dropdown button? 
    // If so, we want to toggle the dropdown. 
    // If we're clicking outside the dropdown we close it, but we want to keep 
    // the dropdown open if we're clicking inside it

    
    //Checks if the user is clicking inside the dropdown. If so, ignore the click (return).
    if(!isDropDownButton && e.target.closest('[data-dropdown]') != null) {
        return;
    }  

    //If the clicked element is a dropdown button, toggle the active class on the dropdown 
    //ancestor
    let currentDropdown;
    if(isDropDownButton) {
        currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('active');
    }

    //Loops through all dropdowns and closes all dropdowns except for the active one 
    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDropdown) {
            return;
        }
        dropdown.classList.remove('active');
    })
})