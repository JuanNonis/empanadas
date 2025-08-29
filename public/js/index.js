// ===== FUNCIONALIDAD DEL INDEX =====

// Función para configurar un carrusel y sus indicadores
function setupCarousel(carouselId) {
  try {
    const carousel = document.getElementById(carouselId);
    if (!carousel) {
      console.warn(`Carrusel con ID '${carouselId}' no encontrado`);
      return;
    }
    
    const indicators = carousel.parentElement?.querySelector('.carousel-indicators');
    if (!indicators) {
      console.warn(`Indicadores para carrusel '${carouselId}' no encontrados`);
      return;
    }
    
    const indicatorButtons = indicators.querySelectorAll('button');
    if (indicatorButtons.length === 0) {
      console.warn(`No se encontraron botones de indicador para '${carouselId}'`);
      return;
    }
    
    // Función para actualizar el indicador activo
    function updateActiveIndicator(activeIndex) {
      indicatorButtons.forEach((indicator, index) => {
        if (index === activeIndex) {
          indicator.classList.add('active');
          indicator.setAttribute('aria-current', 'true');
        } else {
          indicator.classList.remove('active');
          indicator.setAttribute('aria-current', 'false');
        }
      });
    }
    
    // Escuchar el evento de cambio de slide del carrusel
    carousel.addEventListener('slid.bs.carousel', function(event) {
      if (event && typeof event.to === 'number') {
        updateActiveIndicator(event.to);
      }
    });
    
    console.log(`Carrusel '${carouselId}' configurado correctamente`);
  } catch (error) {
    console.error(`Error al configurar carrusel '${carouselId}':`, error);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Configurar ambos carruseles
  setupCarousel('carruselEmpanadas');
  setupCarousel('carruselPizzas');
});
