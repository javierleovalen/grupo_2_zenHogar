window.onload = function () {
  const mobileMenu = document.getElementById('mobileMenuBtn');
  const mobileMenuWindow = document.getElementById('mobileMenuToggle')
  const desktopHeaderBtn = document.getElementById('desktopHeaderBtn')
  const closeBtn = document.querySelector('.closeBtn')
  const navDropDownItem = document.querySelectorAll('.desktop-header__items')
  const navToggleMenu = document.querySelectorAll('.desktop-header__dropdown-container')

  // mobileMenu.addEventListener('click', function (event) {
  //   mobileMenuWindow.classList.toggle('mobile-menu--active')
  //   if (mobileMenuWindow.classList.contains('mobile-menu--active')) {
  //     mobileMenu.innerHTML = '<i class="fa-solid fa-xmark"></i>'
  //     document.body.style.overflowY = 'hidden'
  //   } else {
  //     mobileMenu.innerHTML = '<i class="fa-solid fa-bars"></i>'
  //     document.body.style.overflowY = 'unset'
  //   }
  // });

//   navDropDownItem.forEach(nav => {
//     nav.addEventListener('mouseover', function (event) {
//       nav.nextElementSibling.classList.toggle('desktop-header__dropdown-container--active');
//       nav.nextElementSibling.addEventListener('mouseout', function(event) {
//         this.classList.toggle('desktop-header__dropdown-container--active')
//       })
//   });
// })

  // desktopHeaderBtn.addEventListener('click', function (event) {
  //   desktopSlideMenu.classList.toggle('desktop-main-menu--active')
  // })

  // closeBtn.addEventListener('click', function (event) {
  //   desktopSlideMenu.classList.toggle('desktop-main-menu--active')
  // })



  
}