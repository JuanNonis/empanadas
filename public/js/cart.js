// ===== FUNCIONALIDAD DEL CARRITO =====

// Namespace para evitar conflictos globales
const CartManager = {
  // Función para obtener el carrito del localStorage
  getCart() {
    try {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      return [];
    }
  },

  // Función para guardar el carrito en localStorage
  saveCart(cart) {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      this.updateCartBadge();
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
    }
  },

  // Función para actualizar el badge del carrito
  updateCartBadge() {
    const cart = this.getCart();
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    
    if (totalItems > 0) {
      badge.textContent = totalItems;
      badge.style.display = 'block';
    } else {
      badge.style.display = 'none';
    }
  },

  // Función para renderizar los items del carrito
  renderCartItems() {
    const cart = this.getCart();
    const cartContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartContainer || !emptyCart || !cartSummary) return;
    
    if (cart.length === 0) {
      cartContainer.style.display = 'none';
      emptyCart.style.display = 'block';
      cartSummary.style.display = 'none';
      return;
    }
    
    cartContainer.style.display = 'block';
    emptyCart.style.display = 'none';
    cartSummary.style.display = 'block';
    
    let subtotal = 0;
    let cartHTML = '';
    
    cart.forEach((item, index) => {
      const itemTotal = (item.price || 0) * (item.quantity || 0);
      subtotal += itemTotal;
      
      cartHTML += `
        <div class="cart-item">
          <div class="row align-items-center">
            <div class="col-auto">
              <img src="${item.image || ''}" alt="${item.name || 'Producto'}" class="item-image">
            </div>
            <div class="col">
              <div class="item-details">
                <h5>${item.name || 'Producto'}</h5>
                <p>${item.description || ''}</p>
              </div>
            </div>
            <div class="col-auto">
              <div class="item-price">$${((item.price || 0) / 100).toFixed(2)}</div>
            </div>
            <div class="col-auto">
              <div class="quantity-controls">
                <button class="quantity-btn" data-action="decrease" data-index="${index}">
                  <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-display">${item.quantity || 0}</span>
                <button class="quantity-btn" data-action="increase" data-index="${index}">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <div class="col-auto">
              <div class="item-total">$${(itemTotal / 100).toFixed(2)}</div>
            </div>
            <div class="col-auto">
              <button class="remove-btn" data-index="${index}" title="Eliminar producto">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    });
    
    cartContainer.innerHTML = cartHTML;
    this.updateSummary(subtotal, 0, subtotal);
    
    // Agregar event listeners a los botones
    this.attachCartEventListeners();
  },

  // Función para actualizar la cantidad de un item
  updateQuantity(index, change) {
    const cart = this.getCart();
    
    if (cart[index]) {
      cart[index].quantity = (cart[index].quantity || 0) + change;
      
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      
      this.saveCart(cart);
      this.renderCartItems();
    }
  },

  // Función para remover un item del carrito
  removeItem(index) {
    const cart = this.getCart();
    cart.splice(index, 1);
    this.saveCart(cart);
    this.renderCartItems();
  },

  // Función para actualizar el resumen
  updateSummary(subtotal, shipping, total) {
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (subtotalElement) subtotalElement.textContent = `$${(subtotal / 100).toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = `$${(shipping / 100).toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${(total / 100).toFixed(2)}`;
    
    if (checkoutBtn) {
      checkoutBtn.disabled = total === 0;
    }
  },

  // Función para proceder al checkout
  checkout() {
    const cart = this.getCart();
    if (cart.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    
    // Aquí puedes implementar la lógica de checkout
    alert('Funcionalidad de checkout en desarrollo...');
  },

  // Función para agregar producto al carrito
  addToCart(button) {
    const name = button.getAttribute('data-name');
    const description = button.getAttribute('data-description');
    const price = parseInt(button.getAttribute('data-price')) || 0;
    const image = button.getAttribute('data-image');
    const index = button.getAttribute('data-index');
    
    if (!name || !price) {
      console.error('Datos del producto incompletos');
      return;
    }
    
    const cart = this.getCart();
    
    // Buscar si el producto ya existe en el carrito
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + 1;
    } else {
      cart.push({
        name: name,
        description: description || '',
        price: price,
        image: image || '',
        quantity: 1
      });
    }
    
    this.saveCart(cart);
    
    // Mostrar controles de cantidad en lugar del botón de agregar
    const quantityControls = document.getElementById(`quantity-${index}`);
    const addButton = button;
    
    if (quantityControls && addButton) {
      quantityControls.style.display = 'flex';
      addButton.style.display = 'none';
      
      // Actualizar el display de cantidad
      const quantityDisplay = document.getElementById(`qty-${index}`);
      if (quantityDisplay) {
        quantityDisplay.textContent = existingItem ? existingItem.quantity : 1;
      }
    }
    
    // Mostrar notificación
    this.showNotification('Producto agregado al carrito');
  },

  // Función para actualizar cantidad desde el menú
  updateQuantityFromMenu(index, change) {
    const cart = this.getCart();
    // Resolver el nombre del producto desde el DOM
    const addBtn = document.querySelector(`.add-to-cart-btn[data-index="${index}"]`);
    const anyQtyBtn = document.querySelector(`.quantity-controls#quantity-${index} .quantity-btn`);
    const itemName = (anyQtyBtn && anyQtyBtn.getAttribute('data-name')) || (addBtn && addBtn.getAttribute('data-name')) || null;

    if (itemName) {
      const item = cart.find(item => item.name === itemName);
      if (item) {
        item.quantity = (item.quantity || 0) + change;

        if (item.quantity <= 0) {
          // Remover del carrito
          const itemIndex = cart.findIndex(cartItem => cartItem.name === itemName);
          cart.splice(itemIndex, 1);

          // Mostrar botón de agregar
          const addButton = document.querySelector(`.add-to-cart-btn[data-index="${index}"]`);
          const quantityControls = document.getElementById(`quantity-${index}`);

          if (addButton && quantityControls) {
            addButton.style.display = 'flex';
            quantityControls.style.display = 'none';
          }
        } else {
          // Actualizar display de cantidad
          this.updateQuantityDisplay(index, item.quantity);
        }

        this.saveCart(cart);
      }
    }
  },

  // Función para actualizar el display de cantidad
  updateQuantityDisplay(index, quantity) {
    const quantityDisplay = document.getElementById(`qty-${index}`);
    if (quantityDisplay) {
      quantityDisplay.textContent = quantity || 0;
    }
  },

  // Función para mostrar notificación
  showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  },

  // Función para agregar event listeners a los elementos del carrito
  attachCartEventListeners() {
    // Event listeners para botones de cantidad
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const action = btn.getAttribute('data-action');
        const index = parseInt(btn.getAttribute('data-index'));
        const change = action === 'increase' ? 1 : -1;
        this.updateQuantity(index, change);
      });
    });

    // Event listeners para botones de eliminar
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(btn.getAttribute('data-index'));
        this.removeItem(index);
      });
    });
  }
};

// Agregar estilos de animación para notificaciones
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  CartManager.updateCartBadge();
  
  // Solo renderizar items si estamos en la página del carrito
  if (document.getElementById('cart-items')) {
    CartManager.renderCartItems();
    
    // Event listener para el botón de checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => CartManager.checkout());
    }
  }
  
  // Event listeners para botones de agregar al carrito en el menú
  const addButtons = document.querySelectorAll('.add-to-cart-btn');
  addButtons.forEach(button => {
    button.addEventListener('click', function() {
      CartManager.addToCart(this);
    });
  });
});
