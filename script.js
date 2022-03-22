// Does something when window loads (windows loads at the end of the document loading process)
window.onload = () => {
     let places = staticLoadPlaces(); // define a local variable, places is now the staticLoadPlaces() function 
     renderPlaces(places); // renders places which is staticLoadPlaces(), a function that returns the name and location of the model
};

// Declation of the staticLoadPlaces() function
function staticLoadPlaces() {
    return [ // return statement
        {
            name: 'MyModel', // returns name of the model
            location: { // location method, returns coordinates of the desired place
                lat: 43.77236620318983, // latitude of the location
                lng: -79.50556194953222, // longitude of the location
            }
        },
    ];
}

// Declation of the renderPlaces() function with a places parameter, which is the staticLoadPlaces() function
function renderPlaces(places) {
    let scene = document.querySelector('a-scene'); // defines a variable which contains a-scene info from the index.html file

    places.forEach((place) => { // for each gps location (in this case only one) define what info should the place contain
        let latitude = place.location.lat; // define a variable called latitude which contains place's latitude info
        let longitude = place.location.lng; // define a variable called longitude which contains place's longitude info

        let model = document.createElement('a-entity'); // defines a variable which contains a-entity info from the index.html file
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`); // sets variable model's gps coords attribute to our lng and lat 
        model.setAttribute('gltf-model', './assets/MyModel/scene.gltf'); // sets variable model's model attribute to our model file we want to display
        model.setAttribute('rotation', '0 180 0'); // sets variable model's rotation attribute to the rotation we want of the model 
        model.setAttribute('animation-mixer', ''); // sets variable model's animation attribute to no animation (we're not using any)
        model.setAttribute('scale', '0.5 0.5 0.5'); // sets variable model's scale attribute to the scale of the model we want

        model.addEventListener('loaded', () => { // adds an event listener to the model, if the model has loaded, then do something
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')) // the 'do something' is create a new event called gps-entity-place-loaded 
        });

        scene.appendChild(model); // add the model to the scene
    });
}