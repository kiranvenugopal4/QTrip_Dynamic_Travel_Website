import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // const params = new URLSearchParams(search);
  // const adventure = params.urlParams.get('adventure');
  // console.log(adventure);

  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams.entries());

  // Place holder for functionality to work in the Stubs
  return params.adventure;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
  let data = await response.json();
  return data;
  }

  


  // Place holder for functionality to work in the Stubs
  catch (err) {
    alert('Something was wrong! Try again later...');
    return null;
  }
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  document.getElementById("adventure-name").textContent = `${adventure.name}`;
  document.getElementById("adventure-subtitle").textContent = `${adventure.subtitle}`;

  let gallery = document.getElementById("photo-gallery");

  let arr = adventure.images;

  for(let i = 0; i < arr.length; i++){
    let imgLink = arr[i]; 
    let div = document.createElement("div");
    div.innerHTML = `<img src = "${imgLink}">`;
    div.className = "activity-card-image";
    div.style.overflow = "hidden";

    document.getElementById("photo-gallery").append(div);
  }

  document.getElementById("adventure-content").textContent = `${adventure.content}`;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let code = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    
  </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  
</div>`;

let bootstrapElem = document.createElement("div");
bootstrapElem.innerHTML = code;

document.getElementById("photo-gallery").innerHTML = "";
document.getElementById("photo-gallery").append(bootstrapElem);

for(let i = 0; i < images.length; i++){
  let carousel = document.getElementsByClassName("carousel-inner")[0];
  let code = document.createElement('div');

  if (i == 0){
    carousel.innerHTML = `<div class="carousel-item active">
    <img src="${images[i]}" class="d-block w-100" alt="..."></img>
    </div>`;
  }
  if(i>0){
    let activeItem = document.getElementsByClassName("active")[0];
    code.className = 'carousel-item';
    code.innerHTML =  `<img src="${images[i]}" class="d-block w-100" alt="..."></img>`;
    carousel.appendChild(code);
  }
  }
};


//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
