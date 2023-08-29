const ANIMATION_DELAY_MS = 60;

const links = {
  "link-home": {
    text: "Home",
    element: null,
    animationInterval: null,
    mouseOver: false,
    currentPage: false,
  },
  "link-projects": {
    text: "Projects",
    element: null,
    animationInterval: null,
    mouseOver: false,
    currentPage: false,
  },
  "link-info": {
    text: "Info",
    element: null,
    animationInterval: null,
    mouseOver: false,
    currentPage: false,
  },
  "link-contact": {
    text: "Contact",
    element: null,
    animationInterval: null,
    mouseOver: false,
    currentPage: false,
  },
};
let currentPageLink = null;

function animateWriting(link) {
  let numCharsWritten = 0;
  link.element.text = "> _";

  function animationFrame() {
    const partialText = link.text.slice(0, numCharsWritten++);
    link.element.text = `> ${partialText}_`;
    if (partialText === link.text) {
      clearInterval(link.animationInterval);
    }
  }

  animationFrame();
  const interval = setInterval(animationFrame, ANIMATION_DELAY_MS);
  return interval;
}

function mouseOverLink(link) {
  clearAllAnimationIntervals();
  currentPageLink.element.innerHTML = `&nbsp;&nbsp;${currentPageLink.text}`;
  link.animationInterval = animateWriting(link);
}

function mouseLeaveLink(link) {
  if (link === currentPageLink) {
    return;
  }
  clearInterval(link.animationInterval);
  link.animationInterval = null;
  link.element.innerHTML = `&nbsp;&nbsp;${link.text}`;
  setTimeout(reanimateCurrentPageLink, ANIMATION_DELAY_MS);
}

function reanimateCurrentPageLink() {
  // Don't reanimate current page link if another link is hovered
  for (const linkId in links) {
    const link = links[linkId];
    if (link.mouseOver) {
      return;
    }
  }
  if (currentPageLink.animationInterval === null) {
    currentPageLink.animationInterval = animateWriting(currentPageLink);
  }
}

function clearAllAnimationIntervals() {
  for (const linkId in links) {
    const link = links[linkId];
    clearInterval(link.animationInterval);
    link.animationInterval = null;
  }
}

const linkElements = document.querySelectorAll("nav a");

for (const linkElement of linkElements) {
  const link = links[linkElement.id];
  link.element = linkElement;
  if (linkElement.classList.contains("current-page")) {
    link.currentPage = true;
    currentPageLink = link;
  }
}

for (const linkId in links) {
  const link = links[linkId];
  link.element.addEventListener("mouseover", () => {
    link.mouseOver = true;
    mouseOverLink(link);
  });
  link.element.addEventListener("mouseleave", () => {
    link.mouseOver = false;
    mouseLeaveLink(link);
  });
}
