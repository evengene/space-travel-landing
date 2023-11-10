const PLANET_IMAGE = document.querySelector('.planet-image');
const ALL_PLANET_IMAGE = document.querySelectorAll('.planet-image');
const ALL_TAB_LINK = document.querySelectorAll('.tab-link');
const TAB_CONTENT = document.querySelector('.tab-content');
const ALL_TAB_CONTENT = document.querySelectorAll('.tab-content');

document.addEventListener('DOMContentLoaded', () => {
    fetch('../../data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        debugger;
        if (data.destinations) {
          data.destinations.forEach((destination, index) => {
            // 1. Set tab image
            if (index === 0) {
              PLANET_IMAGE.src = destination.images.png;
              PLANET_IMAGE.alt = `Image of ${destination.name}`;
            }
            else {
              const allPlanetClone = PLANET_IMAGE.cloneNode(true);
              allPlanetClone.src = destination.images.png;
              allPlanetClone.alt = `Image of ${destination.name}`;
              allPlanetClone.style.display = 'none';
              PLANET_IMAGE.parentNode.appendChild(allPlanetClone);
              showImage(0)
            }
            // 2. Set tab links
            const tabLink = document.querySelector(`.tab-link[data-index="${index}"]`);
            if (!tabLink) {
              return;
            }
            tabLink.setAttribute('data-planet', destination.name);
            tabLink.setAttribute('data-image', destination.images.png);
            tabLink.textContent = destination.name;
            // 3. Update the tabs content
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
          });
        }
      })

      .catch(error => {
        console.error(`There has been a problem with your fetch operation: ${error.message}`);
      })

    // Add event listeners to tab links
    let tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(tab => {
      tab.addEventListener('click', function (event) {
        event.preventDefault();
        let planet = this.getAttribute('data-planet');
        let image = this.getAttribute('data-image');
        openTab(planet, image);
        const index = this.getAttribute('data-index');
        showContent(index);
      });
    });
  }
);

function openTab(planet, image) {
  if (!planet || !image) {
    return;
  }

  const planetImages = document.querySelectorAll('.planet-image');
  const tabContent = document.querySelectorAll('.tab-content');

 // Show all images and hide only those not matching the planet
  planetImages.forEach((item) => {
    const selectedFileName = image.split('/').pop();
    const fileName = item.src.split('/').pop();

    if (selectedFileName !== fileName) {
      item.style.display = 'none';
    } else {
      item.style.display = 'block';
    }
  });

// Hide all tab content
  tabContent.forEach((content) => {
    content.style.display = 'none';
  });

  // Show the relevant tab content
  let activeTabContent = document.getElementById(planet);
  if (activeTabContent) {
    activeTabContent.style.display = "block";
  }


  // Remove the 'active' class from all tab links
  ALL_TAB_LINK.forEach((link) => {
    link.classList.remove('active');
  });
  


  // Set the 'active' class on the clicked tab link
  // Since we're using a function and not an arrow function, 'this' is not the clicked element
  // So we find the clicked element by matching the data-planet attribute
  ALL_TAB_LINK.forEach((link) => {
    if (link.getAttribute("data-planet") === planet) {
      link.classList.add("active");
    }
  });
}

const showContent = (index) => {
  ALL_TAB_CONTENT.forEach((content) => {
    content.style.display = 'none';
  });
  ALL_TAB_CONTENT[index].style.display = 'block';
}

const showImage = (index) => {
  ALL_PLANET_IMAGE.forEach((image) => {
    image.style.display = 'none';
  });
  ALL_PLANET_IMAGE[index].style.display = 'block';
}