document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Aplicación web cargada');

  // Log navegación en productos
  const enlacesProductos = document.querySelectorAll('.producto-card a');

  enlacesProductos.forEach(enlace => {
    enlace.addEventListener('click', () => {
      console.log('➡️ Navegando a:', enlace.getAttribute('href'));
    });
  });

  // Mensaje bienvenida en home
  if (window.location.pathname === '/') {
    setTimeout(() => {
      console.log('🎉 ¡Bienvenido a Mi Tienda!');
    }, 1000);
  }

  // Lazy loading básico (si hay imágenes)
  const imagenes = document.querySelectorAll('img[data-src]');
  if (imagenes.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    imagenes.forEach(img => observer.observe(img));
  }
});
