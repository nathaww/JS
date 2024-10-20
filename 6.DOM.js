// DOM vs BOM
console.log(window.innerHeight);
console.log(window.innerWidth);
console.log(screen.width);
console.log(screen.height);
console.log(window.location);


// event bubbling and capturing 
// bubbling is when the propagation path is from bottom to top (lowest child to ancestor)
// capturing is when the propagation path is from top to bottom

// by default, event bubbling is used
// we can change it to capturing by setting the third parameter of addEventListener to true
// we can stop the propagation of an event by calling event.stopPropagation()
// we can prevent the default behavior of an event by calling event.preventDefault()

// event delegation
// we can attach an event listener to a parent element and then check if the event target matches the selector we want
// this is more efficient than attaching an event listener to each child element
// we can use event.target to get the element that triggered the event
// we can use event.currentTarget to get the element that the event listener is attached to

// event.target vs event.currentTarget
// event.target is the element that triggered the event
// event.currentTarget is the element that the event listener is attached to

// event delegation example
document.getElementById('parent').addEventListener('click', function(event) {
    if (event.target.matches('.child')) {
        console.log('child clicked');
    }
}); 

// stopPropagation and preventDefault
document.getElementById('child').addEventListener('click', function(event) {
    console.log('child clicked');
    event.stopPropagation();
    event.preventDefault();
});