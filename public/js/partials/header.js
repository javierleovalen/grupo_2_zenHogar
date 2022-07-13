window.onload = function () {
  const mobileMenu = document.getElementById('mobileMenuBtn');
  const mobileMenuWindow = document.getElementById('mobileMenuToggle')
  const desktopHeaderBtn = document.getElementById('desktopHeaderBtn')
  const closeBtn = document.querySelector('.closeBtn')

  mobileMenu.addEventListener('click', function (event) {
    mobileMenuWindow.classList.toggle('mobile-menu--active')
    if(mobileMenuWindow.classList.contains('mobile-menu--active')) {
      mobileMenu.innerHTML = '<i class="fa-solid fa-xmark"></i>'
      document.body.style.overflowY = 'hidden'
    } else {
      mobileMenu.innerHTML = '<i class="fa-solid fa-bars"></i>'
      document.body.style.overflowY = 'unset'
    }
  });

  desktopHeaderBtn.addEventListener('click', function (event) {
    desktopSlideMenu.classList.toggle('desktop-main-menu--active')
  })

  closeBtn.addEventListener('click', function (event) {
    desktopSlideMenu.classList.toggle('desktop-main-menu--active')
  })


  
}