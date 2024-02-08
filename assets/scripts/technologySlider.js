import { handleResponse, handleData, handleError, showSelectedItem } from '../scripts/dataLoader.js';

document.addEventListener('DOMContentLoaded', () => {
  fetch('../../data.json')
    .then(handleResponse)
    .then((data) => {
      const circlesContainer = document.querySelector('.circles');
      handleData(data, 'technology', (technology, index) => populateContent(technology, index, circlesContainer));
      circlesContainer.addEventListener('click', onCircleClickHandler);
    })
    .catch(handleError);
});

function populateContent(technology, index, circlesContainer) {
  console.log('populateContent called with index:', index, 'and technology:', technology);

  const techImages = document.querySelectorAll('.technology__slider-image');
  const slideContents = document.querySelectorAll('.slide-content');

  const techImage = techImages[index];
  const {portrait, landscape} = technology.images;
  techImage.src = window.innerWidth < 768 ? landscape : portrait;
  techImage.alt = `Image of ${technology.name}`;
  techImage.style.display = index === 0 ? 'block' : 'none';
  techImage.setAttribute('data-image', technology.images.portrait);

  const slideContent = slideContents[index];
  slideContent.innerHTML = `
    <p class="technology__slider-subtitle">The terminology…</p>
    <h3 class="technology__slider-title">${technology.name}</h3>
    <p class="paragraph">${technology.description}</p>
  `;
  slideContent.style.display = index === 0 ? 'block' : 'none';

  const circleElement = document.createElement('li');
  circleElement.className = 'circle';
  circleElement.innerHTML = `
    <a href="#" data-image="${technology.images.portrait}" data-index="${index}" class="circle-link"></a>
  `;
  circlesContainer.appendChild(circleElement);

  showSelectedItem(techImages, index);
  showSelectedItem(slideContents, index);
}

const onCircleClickHandler = (event) => {
  const circle = event.target.closest('.circle-link');
  if (!circle) return;
  event.preventDefault();
  const dataImage = circle.getAttribute('data-image');
  const dataIndex = circle.getAttribute('data-index');
  if (dataIndex && dataImage) {
    const techImages = document.querySelectorAll('.technology__slider-image');
    showSelectedItem(techImages, dataIndex);
    const allTabContent = document.querySelectorAll(`.slide-content`);
    showSelectedItem(allTabContent, dataIndex);
  }
}