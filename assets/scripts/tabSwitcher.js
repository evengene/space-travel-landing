function openTab(planet, image) {
  if (!planet || !image) {
    return;
  }
  const tabContentElements = document.querySelectorAll('.tab-content');
  const tabLinkElements = document.querySelectorAll('.tab-link');

// Hide all tab content elements
  for (let i = 0; i < tabContentElements.length; i++) {
    tabContentElements[i].style.display = "none";
  }

  // Remove the 'active' class from all tab links
  for (let i = 0; i < tabLinkElements.length; i++) {
    tabLinkElements[i].classList.remove("active");
  }

  // Show the relevant tab content
  let activeTabContent = document.getElementById(planet);
  if (activeTabContent) {
    activeTabContent.style.display = "block";
  }


  // Set the 'active' class on the clicked tab link
  // Since we're using a function and not an arrow function, 'this' is not the clicked element
  // So we find the clicked element by matching the data-planet attribute
  for (let i = 0; i < tabLinkElements.length; i++) {
    if (tabLinkElements[i].getAttribute("data-planet") === planet) {
      tabLinkElements[i].classList.add("active");
      break; // Stop the loop after finding the right tab link
    }
  }

  // Update the image source
  let displayImage = document.getElementById("planet-image");
  if (displayImage) {
    displayImage.src = image;
    displayImage.alt = "Image of " + planet;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let tabLinks = document.querySelectorAll('.tab-link');

  tabLinks.forEach(tab => {
    tab.addEventListener('click', function(event) {
      event.preventDefault();
      let planet = this.getAttribute('data-planet');
      let image = this.getAttribute('data-image');
      openTab(planet, image);
    });
  });
});