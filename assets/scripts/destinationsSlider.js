import { handleResponse, handleData, handleError, showSelectedItem } from '../scripts/dataLoader.js';

const ALL_PLANET_IMAGES = document.querySelectorAll('.planet-image');
const TAB_CONTENT = document.querySelector('.tab-content');
const TABS = document.querySelector('.tabs');
const DISTANCE = document.querySelector('.stats__content--distance');
const TRAVEL = document.querySelector('.stats__content--time');

let planetData;
document.addEventListener('DOMContentLoaded', () => {
  fetch('../../data.json')
    .then(handleResponse)
    .then((data) => {
      handleData(data, 'destinations', populateContent);
      planetData = data;
    })
    .catch(handleError);
  TABS.addEventListener('click', onTabClickHandler);
});

function openTab(planet, image) {
  if (!planet || !image) {
    return;
  }
  updateTabImage(image)
  updateTabContent(planet)
  setActiveTab(planet)
  updateStatsContent(planet)
}

const updateTabImage = (image) => {
  const planetImages = document.querySelectorAll('.planet-image');
  planetImages.forEach((item) => {
    const selectedFileName = image.split('/').pop();
    const fileName = item.src.split('/').pop();
    item.style.display = (selectedFileName !== fileName) ? 'none' : 'block';
  });
}

const updateTabContent = (currentPlanet) => {
  const tabContent = document.querySelectorAll('.tab-content');
  tabContent.forEach((item) => {
    const selectedPlanet = item.id;
    item.style.display = (selectedPlanet !== currentPlanet) ? 'none' : 'block';
  });
}

const updateStatsContent = (selectedPlanet) => {
  const currentPlanet = DISTANCE.getAttribute('data-planet');
  if (currentPlanet === selectedPlanet) {
    DISTANCE.textContent = planetData[currentPlanet].distance;
    TRAVEL.textContent = planetData[currentPlanet].travel;
  }
}

const setActiveTab = (selectedPlanet) => {
  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach((tab) => {
    const currentPlanet = tab.getAttribute('data-planet');
    tab.classList.remove('active');
    if (currentPlanet === selectedPlanet) {
      tab.classList.add('active');
    }
  });

}

const populateContent = (destination, index) => {
  const PLANET_IMAGE = document.querySelector('.planet-image');
  if (index === 0) {
    // 1. Set tab image
    PLANET_IMAGE.src = destination.images.png;
    PLANET_IMAGE.alt = `Image of ${destination.name}`;
    // 2. Set tab links
    const TAB_LINK = document.querySelector('.tab-link');
    TAB_LINK.setAttribute('data-planet', destination.name);
    TAB_LINK.setAttribute('data-image', destination.images.png);
    TAB_LINK.setAttribute('data-index', index);
    TAB_LINK.textContent = destination.name;
    TAB_LINK.classList.add('active');
    // 3. Set stats content
    const DISTANCE = document.querySelector('.stats__content--distance');
    const TRAVEL = document.querySelector('.stats__content--time');
    DISTANCE.setAttribute('data-planet', destination.name);
    TRAVEL.setAttribute('data-planet', destination.name);
    DISTANCE.textContent = destination.distance;
    TRAVEL.textContent = destination.travel;
    // 4. Update the tabs content
    TAB_CONTENT.setAttribute('id', destination.name);
    TAB_CONTENT.querySelector('.title').textContent = destination.name;
    TAB_CONTENT.querySelector('.paragraph').textContent = destination.description;
    TAB_CONTENT.style.display = 'block';
    showSelectedItem(ALL_PLANET_IMAGES, 0);
  } else {
    // 1. Set tab image for other slides
    const clonedImage = PLANET_IMAGE.cloneNode(true);
    clonedImage.src = destination.images.png;
    clonedImage.alt = `Image of ${destination.name}`;
    clonedImage.style.display = 'none';
    PLANET_IMAGE.parentNode.appendChild(clonedImage);
     // 2. Set tab links for other slides
    const listItem = document.querySelector('.tabs li');
    const clonedListItem = listItem.cloneNode(true);
    const linkFromListItem = clonedListItem.querySelector('.tab-link');
    linkFromListItem.setAttribute('data-planet', destination.name);
    linkFromListItem.setAttribute('data-image', destination.images.png);
    linkFromListItem.setAttribute('data-index', index);
    linkFromListItem.textContent = destination.name;
    if (index !== 0) {
      linkFromListItem.classList.remove('active');
    }
    listItem.parentNode.appendChild(clonedListItem);
    // 3. Set stats content for other slides
    let distance = document.querySelector('.stats__content--distance');
    const query = document.querySelector('.stats__content--time');
    distance.setAttribute('data-planet', destination.name);
    query.setAttribute('data-planet', destination.name);
    distance.textContent = destination.distance;
    query.textContent = destination.travel;
    // 4. Update the tabs content for other slides
    const tabContentClone = TAB_CONTENT.cloneNode(true);
    tabContentClone.setAttribute('id', destination.name);
    tabContentClone.querySelector('.title').textContent = destination.name;
    tabContentClone.querySelector('.paragraph').textContent = destination.description;
    tabContentClone.style.display = 'none';
    TAB_CONTENT.parentNode.appendChild(tabContentClone);
  }
}

const onTabClickHandler = (event) => {
  const tab = event.target.closest('.tab-link');
  if (!tab) return;
  event.preventDefault();
  const planet = event.target.getAttribute('data-planet');
  const image = event.target.getAttribute('data-image');
  const index = event.target.getAttribute('data-index');
  if (planet && image) {
    openTab(planet, image);
  }
  if (index) {
    const allTabContent = document.querySelectorAll(`.tab-content`);
    showSelectedItem(allTabContent, index);
  }
}
