const links = document.querySelectorAll('nav a');

for (const link of links) {
  link.addEventListener('mouseover', (e) => {
    console.log(e)
  })
}
