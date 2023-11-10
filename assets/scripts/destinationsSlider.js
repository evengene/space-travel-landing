function onDestinationClick(event, planetName, image) {
  // hide all elements of 'tab-content' class
  let tabContent = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none';
  }

  // remove 'active' class from all elements of 'destinations__link' class
  let destinationsLinks = document.getElementsByClassName('destinations__link');
  for (let i = 0; i < destinationsLinks.length; i++) {
    destinationsLinks[i].classList.remove('active');
  }

  // show current tab, and add 'active' class to current button
  document.getElementById(planetName).style.display = 'block';
  event.currentTarget.classList.add('active');

  // change background image
  document.getElementById('destinations__image').style.backgroundImage = `url(${image})`;
}