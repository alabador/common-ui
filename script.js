/*Dropdown JS*/
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

/*Slider Logic*/
const sliderContainer = document.querySelector('.image-slider-container');
const slides = document.querySelectorAll('.slide');
const selectors = document.querySelectorAll('.selector-circle');
const frame = document.querySelector('.slide-frame');

let currentSlideIndex = 0;
const size = slides[0].clientWidth;
const numberOfSlides = slides.length;

//Listeners
sliderContainer.addEventListener('click', e => {
    const isRightArrow = e.target.matches('.arrow-right, .fa-arrow-circle-right');
    const isLeftArrow = e.target.matches('.arrow-left, .fa-arrow-circle-left');


    if (isRightArrow){
        currentSlideIndex++;
        if (currentSlideIndex > numberOfSlides - 1){currentSlideIndex = 0};
        changeSlide();
    }
    else if(isLeftArrow){
        currentSlideIndex--;
        if (currentSlideIndex < 0){currentSlideIndex = 2};

        changeSlide();
    }
    
    
});

function changeSlide() {
    frame.style.transition = "transform 0.75s ease-in-out";
    frame.style.transform = 'translateX(' + (-size * currentSlideIndex) + 'px)';

    selectors.forEach(selector => {selector.classList.remove('current')});
    selectors[currentSlideIndex].classList.add('current');
}

selectors.forEach((selector, index) => {
    selector.addEventListener('click', function(){
        currentSlideIndex = index;
        changeSlide();
    })
});

function autoSlide() {
    setInterval(function() {
        currentSlideIndex++;
        if (currentSlideIndex > numberOfSlides - 1){currentSlideIndex = 0};
        changeSlide();
    }, 5000);
};

window.onload = autoSlide();