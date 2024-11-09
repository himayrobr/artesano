// controllers/orderController.js

// Crear un nuevo pedido
exports.createOrder = (req, res) => {
    const { customerName, product, quantity, totalPrice } = req.body;
  
    // Lógica para crear un pedido (esto sería donde interactúas con la base de datos)
    // Aquí simplemente devolvemos una respuesta con los datos enviados para simular el proceso
    res.status(201).json({
      message: 'Order created successfully',
      order: {
        customerName,
        product,
        quantity,
        totalPrice,
        createdAt: new Date(),
      },
    });
  };
  
  // Obtener todos los pedidos
  exports.getAllOrders = (req, res) => {
    // Lógica para obtener todos los pedidos (simulado con un arreglo de ejemplo)
    const orders = [
      {
        id: 1,
        customerName: 'Juan Perez',
        product: 'Artesanía de madera',
        quantity: 3,
        totalPrice: 45.00,
        createdAt: new Date(),
      },
      {
        id: 2,
        customerName: 'Maria Lopez',
        product: 'Cesta tejida',
        quantity: 2,
        totalPrice: 30.00,
        createdAt: new Date(),
      },
    ];
  
    // Devuelves todos los pedidos en la respuesta
    res.status(200).json(orders);
  };
  
  // Obtener un pedido por ID
  exports.getOrderById = (req, res) => {
    const { id } = req.params;
  
    // Lógica para obtener un pedido por ID (simulado)
    const order = {
      id,
      customerName: 'Juan Perez',
      product: 'Artesanía de madera',
      quantity: 3,
      totalPrice: 45.00,
      createdAt: new Date(),
    };
  
    // Verificar si el pedido existe
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
  
    // Devolver el pedido encontrado
    res.status(200).json(order);
  };
  
  // Actualizar un pedido
  exports.updateOrder = (req, res) => {
    const { id } = req.params;
    const { customerName, product, quantity, totalPrice } = req.body;
  
    // Lógica para actualizar un pedido (simulado)
    // Actualizarías los datos en la base de datos
  
    res.status(200).json({
      message: 'Order updated successfully',
      order: {
        id,
        customerName,
        product,
        quantity,
        totalPrice,
        updatedAt: new Date(),
      },
    });
  };
  
  // Eliminar un pedido
  exports.deleteOrder = (req, res) => {
    const { id } = req.params;
  
    // Lógica para eliminar un pedido (simulado)
    // Eliminarías el pedido de la base de datos
  
    res.status(200).json({ message: `Order with ID ${id} deleted successfully` });
  };
  