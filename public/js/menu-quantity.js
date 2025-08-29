// ===== FUNCIONALIDAD DE CONTROLES DE CANTIDAD EN EL MENÚ =====

// Función para actualizar cantidad desde el menú
function updateQuantityFromMenu(index, change) {
  const cart = CartManager.getCart();
  const itemName = getItemNameByIndex(index);
  
  if (itemName) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
      item.quantity = (item.quantity || 0) + change;
      
      if (item.quantity <= 0) {
        // Remover del carrito
        const itemIndex = cart.findIndex(cartItem => cartItem.name === itemName);
        cart.splice(itemIndex, 1);
        
        // Mostrar botón de agregar
        const addButton = document.querySelector(`[data-index="${index}"]`);
        const quantityControls = document.getElementById(`quantity-${index}`);
        
        if (addButton && quantityControls) {
          addButton.style.display = 'flex';
          quantityControls.style.display = 'none';
        }
      } else {
        // Actualizar display de cantidad
        updateQuantityDisplay(index, item.quantity);
      }
      
      CartManager.saveCart(cart);
    }
  }
}

// Función para obtener el nombre del item por índice
function getItemNameByIndex(index) {
  const menuItems = [
    'Empanada de Carne',
    'Empanada de Pollo', 
    'Pizza Muzarella',
    'Docena de Empanadas',
    'Media Docena de Empanadas',
    'Combo 3 Empanadas + Bebida'
  ];
  
  return menuItems[index] || null;
}

// Función para actualizar el display de cantidad
function updateQuantityDisplay(index, quantity) {
  const quantityDisplay = document.getElementById(`qty-${index}`);
  if (quantityDisplay) {
    quantityDisplay.textContent = quantity || 0;
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Event listeners para controles de cantidad en el menú
  const quantityBtns = document.querySelectorAll('.quantity-btn[data-action]');
  quantityBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const action = btn.getAttribute('data-action');
      const index = btn.getAttribute('data-index');
      const change = action === 'increase' ? 1 : -1;
      updateQuantityFromMenu(index, change);
    });
  });
});
