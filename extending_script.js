// Does something when window loads (windows loads at the end of the document loading process)
window.onload = () => {
  render(); // renders the scene
};

const models = [ // define a constant variable models
  {
    url: './assets/myModel/scene.gltf', // the model location
    scale: '0.5 0.5 0.5', // scale of the model
    rotation: '0 225 0' // rotation of the model
  },
];

let modelIndex = 0; // define modelIndex variable which is 0
const setModel = (model, entity) => { // define a constant variable setModel with model and entity parameters
  if (model.position) { // if model position is called
    entity.setAttribute('position', model.position); // set entity's position attribute to the model's gps position
  }

  entity.setAttribute('gltf-model', model.url); // else set entity's position attribute to the model's url
};

// Declation of the render() function 
function render() { 
  const scene = document.querySelector('a-scene'); // defines a variable which contains a-scene info from the index.html file

  navigator.geolocation.getCurrentPosition(function (position) { // the geolocation is your current position, getting the actual geolocation below
    const latitude = position.coords.latitude; // define a constant variable with latitude of the location
    const longitude = position.coords.longitude; // define a constant variable with longitude of the location

    const model = document.createElement('a-entity'); // define a constant variable model which contains a-entity info from the index.html file
    model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`); // set model's gps aattribute to the location we defined

    setModel(models[modelIndex], model); // set each model (if more than one)

    model.setAttribute('animation-mixer', ''); // no animation

    scene.appendChild(model); // add the model to the scene
  });
}
