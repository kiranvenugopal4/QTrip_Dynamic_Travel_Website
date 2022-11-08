import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("From init()");
  console.log(cities);

  //Updates the DOM with the cities
  cities.forEach((city) => {
    addCityToDOM(city.id, city.city, city.description, city.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
    try{
    const fetchRes = await fetch(`${config.backendEndpoint}/cities`);
    const data = await fetchRes.json();
    return data;
  
    }
    catch{
     const data = null;
     return data;
    }
  }
  

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let container = document.createElement("div");
  container.className = "col-lg-3 col-xs-12 col-sm-6 py-2";

  let innerHTML = `<a href="pages/adventures/?city=${id}" id=${id}>
  <div class="tile ">

  <div class="tile-text text-center text-white">
    <h5>${city}</h5>
    <p>${description}</p>
  </div>    
  <img class="img-fluid rounded" src="${image}">
  </div>
  </a>`;
  container.innerHTML = innerHTML;

  //add to DOM
  let parent = document.getElementById("data");
  parent.appendChild(container);


  

}

export { init, fetchCities, addCityToDOM };
