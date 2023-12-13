import { handleResponse, handleData, handleError, showSelectedItem } from '../scripts/dataLoader.js';

document.addEventListener('DOMContentLoaded', () => {
  fetch('../../data.json')
    .then(handleResponse)
    .then((data) => {
      handleData(data, 'crew', populateContent);
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot) => {
        dot.addEventListener('click', onDotClickHandler);
      });
    })
    .catch(handleError);

});

function onNextSlideClick(dataSlide, dataImage) {
  if (!dataSlide || !dataImage) {
    return;
  }
  updateCrewImage(dataImage)
  updateTabContent(dataSlide)
  setActiveDot(dataSlide)
}

const updateCrewImage = (dataImage) => {
  const crewImages = document.querySelectorAll('.crew-image');
  crewImages.forEach((item) => {
    const selectedFileName = dataImage.split('/').pop();
    const fileName = item.src.split('/').pop();
    item.style.display = (selectedFileName !== fileName) ? 'none' : 'block';
  });
}

const updateTabContent = (dataSlide) => {
  const tabContent = document.querySelectorAll('.slide-content');
  tabContent.forEach((item) => {
    const selectedSlide = item.id;
    item.style.display = (selectedSlide !== dataSlide) ? 'none' : 'block';
  });
}

const setActiveDot = (selectedPlanet) => {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((tab) => {
    const dataSlide = tab.getAttribute('data-slide');
    tab.classList.remove('active');
    if (dataSlide === selectedPlanet) {
      tab.classList.add('active');
    }
  });

}

const populateContent = (crew, index) => {
  const CREW_IMAGE = document.querySelector('.crew-image');
  if (index === 0) {
    // 1. Set tab image for first slide
    CREW_IMAGE.src = crew.images.webp || crew.images.png;
    CREW_IMAGE.alt = `Image of ${crew.name}`;
    // 2. Set dot attributes for first slide
    const DOT = document.querySelector('.dot');
    DOT.setAttribute('data-slide', crew.name);
    DOT.setAttribute('data-image', crew.images.png);
    DOT.setAttribute('data-index', index);
    DOT.classList.add('active');
    // 3. Set slide content for first slide
    const SLIDE_CONTENT = document.querySelector('.slide-content');
    SLIDE_CONTENT.setAttribute('id', crew.name);
    SLIDE_CONTENT.querySelector('.title').textContent = crew.name;
    SLIDE_CONTENT.querySelector('.role').textContent = crew.role;
    SLIDE_CONTENT.querySelector('.paragraph').textContent = crew.bio;
    SLIDE_CONTENT.style.display = 'block';
    const ALL_CREW_IMAGES = document.querySelectorAll('.crew-image');
    showSelectedItem(ALL_CREW_IMAGES, 0);
  } else {
    // 1. Set tab image for other slides
    const clonedImage = CREW_IMAGE.cloneNode(true);
    clonedImage.src = crew.images.webp || crew.images.png;
    clonedImage.alt = `Image of ${crew.name}`;
    clonedImage.style.display = 'none';
    CREW_IMAGE.parentNode.appendChild(clonedImage);
    // 2. Set tab links for other slides
    const listItem = document.querySelector('.dots li');
    const clonedListItem = listItem.cloneNode(true);
    const linkFromListItem = clonedListItem.querySelector('.dot');
    linkFromListItem.setAttribute('data-slide', crew.name);
    linkFromListItem.setAttribute('data-image', crew.images.png);
    linkFromListItem.setAttribute('data-index', index);
    if (index !== 0) {
      linkFromListItem.classList.remove('active');
    }
    listItem.parentNode.appendChild(clonedListItem);
    // 3. Set slide content for other slides
    const SLIDE_CONTENT = document.querySelector('.slide-content');
    const tabContentClone = SLIDE_CONTENT.cloneNode(true);
    tabContentClone.setAttribute('id', crew.name);
    tabContentClone.querySelector('.title').textContent = crew.name;
    tabContentClone.querySelector('.role').textContent = crew.role;
    tabContentClone.querySelector('.paragraph').textContent = crew.bio;
    tabContentClone.style.display = 'none';
    SLIDE_CONTENT.parentNode.appendChild(tabContentClone);
  }
}

const onDotClickHandler = (event) => {
  event.preventDefault();
  const dataSlide = event.target.getAttribute('data-slide');
  const dataImage = event.target.getAttribute('data-image');
  const dataIndex = event.target.getAttribute('data-index');
  if (dataSlide && dataImage) {
    onNextSlideClick(dataSlide, dataImage);
  }
  if (dataIndex) {
    const allTabContent = document.querySelectorAll(`.slide-content`);
    showSelectedItem(allTabContent, dataIndex);
  }
}
