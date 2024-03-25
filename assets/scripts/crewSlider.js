import { handleResponse, handleData, handleError, showSelectedItem } from '../scripts/dataLoader.js';

document.addEventListener('DOMContentLoaded', () => {
  fetch('../../data.json')
    .then(handleResponse)
    .then((data) => {
      const dotsContainer = document.querySelector('.dots');
      handleData(data, 'crew', (crew, index) => populateContent(crew, index, dotsContainer));
      dotsContainer.addEventListener('click', onDotClickHandler);
    })
    .catch(handleError);
});

function onNextSlideClick(currentCrewMember, dataImage) {
  if (!currentCrewMember || !dataImage) {
    return;
  }
  updateCrewImage(dataImage)
  updateTabContent(currentCrewMember)
  setActiveDot(currentCrewMember)
}

const updateCrewImage = (dataImage) => {
  const crewImages = document.querySelectorAll('.crew__slider-image');
  crewImages.forEach((item) => {
    const selectedFileName = dataImage.split('/').pop();
    const fileName = item.src.split('/').pop();
    item.style.display = (selectedFileName !== fileName) ? 'none' : 'block';
  });
}

const updateTabContent = (currentCrewMember) => {
  const tabContent = document.querySelectorAll('.slide-content');
  tabContent.forEach((item) => {
    const selectedSlide = item.id;
    item.style.display = (selectedSlide !== currentCrewMember) ? 'none' : 'block';
  });
}

const setActiveDot = (selectedCrewMember) => {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((tab) => {
    const currentCrewMember = tab.getAttribute('data-slide');
    tab.classList.remove('active');
    if (currentCrewMember === selectedCrewMember) {
      tab.classList.add('active');
    }
  });

}

function populateContent(crew, index, dotsContainer) {
  console.log('populateContent called with index:', index, 'and crew:', crew);

  const crewImages = document.querySelectorAll('.crew__slider-image');
  const slideContents = document.querySelectorAll('.slide-content');

  console.log('crewImages length:', crewImages.length);
  console.log('slideContents length:', slideContents.length);

  const crewImage = crewImages[index];
  crewImage.src = crew.images.webp || crew.images.png;
  crewImage.alt = `Image of ${crew.name}`;
  crewImage.style.display = index === 0 ? 'block' : 'none';

  const dotElement = document.createElement('li');
  dotElement.innerHTML = `
    <a href="#" data-slide="${crew.name}" data-image="${crew.images.png}" data-index="${index}" class="dot ${index === 0 ? 'active' : ''}"></a>
  `;
  dotsContainer.appendChild(dotElement);

  const slideContent = slideContents[index];
  slideContent.innerHTML = `
    <h4 class="role animate__animated animate__fadeIn">${crew.role}</h4>
    <h3 class="crew__slider-title animate__animated animate__fadeIn">${crew.name}</h3>
    <p class="paragraph technology__slider-paragraph animate__animated animate__fadeIn">${crew.bio}</p>
  `;
  slideContent.style.display = index === 0 ? 'block' : 'none';
}

const onDotClickHandler = (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.classList.contains('dot')) {
    const currentCrewMember = target.getAttribute('data-slide');
    const dataImage = target.getAttribute('data-image');
    const dataIndex = target.getAttribute('data-index');
    if (currentCrewMember && dataImage) {
      onNextSlideClick(currentCrewMember, dataImage);
      const crewImages = document.querySelectorAll('.crew__slider-image');
      showSelectedItem(crewImages, dataIndex);
    }
    if (dataIndex) {
      const allTabContent = document.querySelectorAll(`.slide-content`);
      showSelectedItem(allTabContent, dataIndex);
    }
  }
}
