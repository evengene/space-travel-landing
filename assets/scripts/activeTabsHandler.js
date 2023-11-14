const NAV_BAR_LINKS = document.querySelectorAll('.navbar__link');

const addActiveClass = (e) => {
  NAV_BAR_LINKS.forEach((link) => {
    link.classList.remove('active');
  });
  e.target.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  debugger;
  const pathName = window.location.pathname;
  NAV_BAR_LINKS.forEach((link) => {
    const dataLink = link.getAttribute('data-link');
    // const defaultTab = dataLink === "home"
    //     const defaultTab = dataLink === "home" && pathName.includes("index")
    link.addEventListener('click', addActiveClass);

    if (pathName?.includes(dataLink)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
