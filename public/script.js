const animationDelayMs = 60

const links = {
  "link-home": {
    text: "Home",
    element: null,
    animating: false,
    mouseOver: false,
  },
  "link-projects": {
    text: "Projects",
    element: null,
    animating: false,
    mouseOver: false,
  },
  "link-info": {
    text: "Info",
    element: null,
    animating: false,
    mouseOver: false,
  },
  "link-contact": {
    text: "Contact",
    element: null,
    animating: false,
    mouseOver: false,
  },
}

function animateWriting(link) {
  link.animating = true
  let numCharsWritten = 0
  link.element.text = "> _"
  const interval = setInterval(() => {
    if (!link.mouseOver) {
      clearInterval(interval)
      link.element.innerHTML = `&nbsp;&nbsp;${link.text}`
      return
    }
    const partialText = link.text.slice(0, numCharsWritten++)
    link.element.text = `> ${partialText}_`
  }, animationDelayMs)
}

const linkElements = document.querySelectorAll('nav a')

for (const linkElement of linkElements) {
  links[linkElement.id].element = linkElement
}

for (const linkId in links) {
  const link = links[linkId]
  link.element.addEventListener('mouseover', () => {
    link.mouseOver = true
    animateWriting(link)
  })
  link.element.addEventListener('mouseleave', () => {
    link.mouseOver = false
  })
}
