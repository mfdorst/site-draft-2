const ANIMATION_DELAY_MS = 50;
const BLINK_DELAY_MS = 750;

const toAnimateWriting = [...document.querySelectorAll(".animate-writing")]
  .map(elem => ({ elem, text: elem.innerText.trimStart()}));

for (const {elem} of toAnimateWriting) {
  elem.innerHTML = "&nbsp;"
}

const currentPageLink = document.querySelector(".current-page");

const animations = [
  ...toAnimateWriting.map(({elem, text}) => () => animateWriting(elem, text)),
  () =>
    setTimeout(() => setCaretAndBlinkCursor(currentPageLink), BLINK_DELAY_MS),
];

let nextAnimation = 0;
animateNext();

// Each animation will call animateNext when it has finished.
function animateNext() {
  if (nextAnimation < animations.length) {
    animations[nextAnimation++]();
  }
}

function animateWriting(elem, text) {
  let numCharsWritten = 0;
  elem.innerHTML = "&gt; &#9610;";
  const interval = setInterval(nextFrame, ANIMATION_DELAY_MS);
  nextFrame();

  function nextFrame() {
    const partialText = text.slice(0, numCharsWritten++);
    elem.innerHTML = `&gt; ${partialText}&#9610;`;
    if (partialText === text) {
      setTimeout(() => {
        clearInterval(interval);
        elem.innerHTML = `&nbsp; ${partialText}`;
        animateNext();
      }, ANIMATION_DELAY_MS);
    }
  }
}

function setCaretAndBlinkCursor(elem) {
  // Cut off beginning `&nbsp;` and replace it with `&gt;`
  elem.innerHTML = "&gt;" + elem.innerHTML.slice(6) + "&#9610;";
  blinkCursor(elem);
}

function blinkCursor(elem) {
  let cursorShowing = true;
  setInterval(() => {
    if (cursorShowing) {
      elem.innerHTML = elem.innerHTML.slice(0, -1);
    } else {
      elem.innerHTML = elem.innerHTML + "&#9610;";
    }
    cursorShowing = !cursorShowing;
  }, BLINK_DELAY_MS);
}
