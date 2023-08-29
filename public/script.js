const ANIMATION_DELAY_MS = 60;

const linkElements = [...document.querySelectorAll("nav a")];

const links = linkElements.map((element) => {
  const text = element.id.slice(5, 6).toUpperCase() + element.id.slice(6);
  return {
    element,
    text,
    mouseOver: false,
    animationInterval: null,
  };
});

const currentPageLink = links.find((link) =>
  link.element.classList.contains("current-page")
);

for (const link of links) {
  link.element.addEventListener("mouseover", () => {
    link.mouseOver = true;
    mouseOverLink(link);
  });
  link.element.addEventListener("mouseleave", () => {
    link.mouseOver = false;
    mouseLeaveLink(link);
  });
}

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
  for (const link of links) {
    if (link.mouseOver) {
      return;
    }
  }
  if (currentPageLink.animationInterval === null) {
    currentPageLink.animationInterval = animateWriting(currentPageLink);
  }
}

function clearAllAnimationIntervals() {
  for (const link of links) {
    clearInterval(link.animationInterval);
    link.animationInterval = null;
  }
}
