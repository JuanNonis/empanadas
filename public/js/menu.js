// ===== FUNCIONALIDAD DEL MENÚ =====

// Función para filtrar productos
function filterProducts(category) {
  try {
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (menuItems.length === 0) {
      console.warn('No se encontraron elementos del menú para filtrar');
      return;
    }
    
    menuItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      
      if (category === 'todos' || itemCategory === category) {
        item.classList.remove('hidden');
        item.classList.add('visible');
      } else {
        item.classList.add('hidden');
        item.classList.remove('visible');
      }
    });
    
    console.log(`Filtro aplicado: ${category} - ${menuItems.length} elementos procesados`);
  } catch (error) {
    console.error('Error al filtrar productos:', error);
  }
}

// Función para configurar los filtros del menú
function setupMenuFilters() {
  try {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length === 0) {
      console.warn('No se encontraron botones de filtro');
      return;
    }
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        try {
          // Remover clase active de todos los botones
          filterButtons.forEach(btn => btn.classList.remove('active'));
          
          // Agregar clase active al botón clickeado
          this.classList.add('active');
          
          // Obtener la categoría del filtro
          const filterCategory = this.getAttribute('data-filter');
          
          if (!filterCategory) {
            console.warn('Botón de filtro sin atributo data-filter');
            return;
          }
          
          // Aplicar el filtro
          filterProducts(filterCategory);
        } catch (error) {
          console.error('Error al procesar click del filtro:', error);
        }
      });
    });
    
    console.log(`${filterButtons.length} botones de filtro configurados`);
  } catch (error) {
    console.error('Error al configurar filtros del menú:', error);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  setupMenuFilters();
  
  // Mostrar todos los productos por defecto
  filterProducts('todos');
});
