const idTextMap = {
  "link-home": "Home",
  "link-projects": "Projects",
  "link-info": "Info",
  "link-contact": "Contact",
}

const links = document.querySelectorAll('nav a');

for (const link of links) {
  link.addEventListener('mouseover', () => {
    link.text = `> ${idTextMap[link.id]}_`
  })
  link.addEventListener('mouseleave', () => {
    link.innerHTML = `&nbsp;&nbsp;${idTextMap[link.id]}`
  })
}
