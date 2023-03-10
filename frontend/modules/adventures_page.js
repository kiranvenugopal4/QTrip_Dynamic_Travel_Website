
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
 const queryString = search;
 const params = new URLSearchParams(queryString);
 const q = params.get("city");
 return q;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

try {
  const data = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
  const jsonResponse = await data.json();
  console.log(jsonResponse);
  return jsonResponse;
}

catch{
  return null;
}
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(adventure => {
    let card = document.createElement("div");
    card.className = "col-12 col-md-3 col-xxl-3 activity-card my-2";  
    let parent = document.getElementById("data");

    card.innerHTML = ` <a href="detail/?adventure=${adventure.id}" id = "${adventure.id}" class="activity-card w-100 h-100">

    <img class="card-img-top activity-card-image" style="object-fit:cover; width:100%" src=${adventure.image}>  
    
    
    <div class="card-body" style = "width:100%;">
      <div class="category-banner">${adventure.category}</div>
      <div class="d-flex justify-content-between">
      <p class="card-text">${adventure.name}</p>
      <p class="card-text">₹${adventure.costPerHead}</p>
      </div>
      <div class="d-flex justify-content-between">
      <p class="card-text">Duration</p>
      <p class="card-text">${adventure.duration} Hours</p>
      </div>
    </div>
    </a>`;
  


    parent.appendChild(card); 
  });


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = [];
  list.forEach(listItem => {

    let duration = listItem.duration;
    if(duration >= low && duration <= high){
      filteredList.push(listItem);
    }
  });
  return filteredList;
  

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let filteredList = [];

  for(let i=0; i< categoryList.length; i++){
    let filteredCurrCat = list.filter(adv => adv.category == categoryList[i]);
    filteredCurrCat.forEach(adv => {
      filteredList.push(adv)
    });
  }
  return filteredList;

  // for (let i = 0; i < categoryList.length; i++) {
  //   let filterCurrCat = list.filter(adv => adv.category === categoryList[i]);

  //   filterCurrCat.forEach(adv => { filteredList.push(adv) });
  // }

  // return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  if ((filters.category.length > 0) && (filters.duration.length > 0)) {
    let lowTime = filters.duration.split("-")[0];
    let highTime = filters.duration.split("-")[1];
    let durationFiltered = filterByDuration(list, lowTime, highTime);
    return filterByCategory(durationFiltered, filters.category);
  }

  if(filters["category"].length > 0){

    // let categoryList = filters["category"];
    // let filteredList = filterByCategory(filteredList, categoryList);
    return filterByCategory(list, filters.category);
  }

  // if(filters["duration"].length > 0){
  //   let low = filters["duration"]["low"];
  //   let high = filters["duration"]["high"];
  //   filteredList = filterByDuration(list, low, high);
  // }

  if (filters.duration.length > 0) {
    let lowTime = filters.duration.split("-")[0];
    let highTime = filters.duration.split("-")[1];
    return filterByDuration(list, lowTime, highTime);
  }

  

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem(`filters`,JSON.stringify(filters));
  
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let preParse = localStorage.getItem(`filters`);
  // Place holder for functionality to work in the Stubs
  return JSON.parse(preParse);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let durationVal = filters.duration;
  console.log(durationVal);

  if(durationVal == "0-2")
  {
    document.getElementById("duration-select").selectedIndex = 1;
  }
  else if(durationVal == "2-6")
  {
    document.getElementById("duration-select").selectedIndex = 2;
  }
  else if(durationVal == "6-12")
  {
    document.getElementById("duration-select").selectedIndex = 3;
  }
  else if(durationVal == "12-99")
  {
    document.getElementById("duration-select").selectedIndex = 4;
  }

  if (filters.category.length > 0){
    filters.category.forEach(filter => {
      let parent = document.getElementById("category-list");
      let pill = document.createElement("div");
      pill.innerText = `${filter}`;
      pill.classList.add("category-filter");
      parent.appendChild(pill);
    })
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
