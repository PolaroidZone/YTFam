const menuIconButton = document.querySelector("[data-menu-icon-btn]")
const sidebar = document.querySelector("[data-sidebar]")

menuIconButton.addEventListener("click", () => {
  sidebar.classList.toggle("open")
})

const select = document.querySelector('.account-item')
const menu = document.querySelector('.side-dropdown')
const dropdown = document.querySelector('.acItem')
const usersname = document.querySelector('.userac')

select.addEventListener('click', () => {
  menu.classList.toggle('down')
  select.classList.toggle('expanded')
  dropdown.classList.toggle('rolled')
  usersname.classList.toggle('nameopen')
})


const videobtn = document.querySelector('.upload-btn')
const videoform = document.querySelector('.drop-upload')

videobtn.addEventListener('click', () => {
  videoform.classList.toggle('areaopen')
})

const videobtn2 = document.querySelector('.upload-btn2')
const videoform2 = document.querySelector('.drop-upload')

videobtn2.addEventListener('click', () => {
  videoform2.classList.toggle('areaopen')
})

