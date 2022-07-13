window.onload = function() {
  const avatar = document.getElementById('profileAvatar')
  const avatarFile = document.getElementById('avatarInput');

  avatarFile.addEventListener('change', function(events) {
    const newAvatar = this.files[0];
    
    if(newAvatar){
      const reader = new FileReader();

      reader.addEventListener('load', function(events) {
        avatar.setAttribute('src', reader.result)
      })

      reader.readAsDataURL(newAvatar);
    }
  });


  /* VISTA DINAMICA APLICAR SCRIPTS DEL FRONT DE FORMA DINAMICA */
  const mobileMenu = document.getElementById('mobileMenuBtn');
  const mobileMenuWindow = document.getElementById('mobileMenuToggle')

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
}