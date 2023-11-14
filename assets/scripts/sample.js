// import { hello } from './dataLoader';

const PLANET_IMAGE = document.querySelector('.planet-image');
const ALL_PLANET_IMAGES = document.querySelectorAll('.planet-image');
const TAB_CONTENT = document.querySelector('.tab-content');
const ALL_TAB_CONTENT = document.querySelectorAll('.tab-content');
const TABS = document.querySelector('.tabs');
const DISTANCE =  document.querySelector('.stats__content--distance');
const TRAVEL =  document.querySelector('.stats__content--time');

let planetData;

export const handleData = (data, category, populateContent) => {
  if (!category) return;
  data[category].forEach((item, index) =>
    populateContent(item, index));
}

export const fetchData = () => {
  fetch('../../data.json')
    .then(handleResponse)
    .then(handleData)
    .catch(handleError);
}

export const handleResponse = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}



const handleError = (error) => {
  console.error(`Fetch error: ${error.message}`);
}

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  TABS.addEventListener('click', onTabClickHandler);
  handleData('../../data.json', 'destinations', populateContent);
});


function openTab(planet, image) {
  if (!planet || !image) {
    return;
  }
  updateTabImage(image)
  updateTabContent(planet)
  handleTabLink(planet)
  updateStats(planet)
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

const updateStats = (selectedPlanet) => {
  const currentPlanet = DISTANCE.getAttribute('data-planet');
  if (currentPlanet === selectedPlanet) {
    DISTANCE.textContent = planetData[currentPlanet].distance;
    TRAVEL.textContent = planetData[currentPlanet].travel;
  }
}

const handleTabLink = (selectedPlanet) => {
  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach((tab) => {
    const currentPlanet = tab.getAttribute('data-planet');
    tab.classList.remove('active');
    if (currentPlanet === selectedPlanet) {
      tab.classList.add('active');
    }
  });

}

const showContent = (index) => {
  const content = document.querySelectorAll(`.tab-content`);
  content.forEach((content) => {
    content.style.display = 'none';
  });
  content[index].style.display = 'block';
}

const showImage = (index) => {
  ALL_PLANET_IMAGES.forEach((image) => {
    image.style.display = 'none';
  });
  ALL_PLANET_IMAGES[index].style.display = 'block';
}

const populateContent = (destination, index) => {
  // 1. Set tab image
  if (index === 0) {
    PLANET_IMAGE.src = destination.images.png;
    PLANET_IMAGE.alt = `Image of ${destination.name}`;
  } else {
    const clonedImage = PLANET_IMAGE.cloneNode(true);
    clonedImage.src = destination.images.png;
    clonedImage.alt = `Image of ${destination.name}`;
    clonedImage.style.display = 'none';
    PLANET_IMAGE.parentNode.appendChild(clonedImage);
    showImage(0)
  }
  // 2. Set tab links
  // const tabLink = document.querySelector(`.tab-link[data-index="${index}"]`);
  const tabLink = document.querySelector('.tab-link');
  if (!tabLink) {
    return;
  }
  if (index === 0) {
    tabLink.setAttribute('data-planet', destination.name);
    tabLink.setAttribute('data-image', destination.images.png);
    tabLink.setAttribute('data-index', index);
    tabLink.textContent = destination.name;
    tabLink.classList.add('active');
  }
  else {
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
  }
  // 3. Set stats content
  const DISTANCE =  document.querySelector('.stats__content--distance');
  const TRAVEL =  document.querySelector('.stats__content--time');
  if (index === 0) {
    DISTANCE.setAttribute('data-planet', destination.name);
    TRAVEL.setAttribute('data-planet', destination.name);
    DISTANCE.textContent = destination.distance;
    TRAVEL.textContent = destination.travel;
  }
  else {
    let distance = document.querySelector('.stats__content--distance');
    const query =  document.querySelector('.stats__content--time');
    distance.setAttribute('data-planet', destination.name);
    query.setAttribute('data-planet', destination.name);
    distance.textContent = destination.distance;
    query.textContent = destination.travel;
  }
  // 4. Update the tabs content
  if (index === 0) {
    TAB_CONTENT.setAttribute('id', destination.name);
    TAB_CONTENT.querySelector('.title').textContent = destination.name;
    TAB_CONTENT.querySelector('.paragraph').textContent = destination.description;
    TAB_CONTENT.style.display = 'block';
  } else {
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
    showContent(index);
  }
}