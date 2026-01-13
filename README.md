Backend de Ecommerce - Comisión 94460
Hola! Este es el avance de mi proyecto de Ecommerce. En esta etapa me enfoqué en la gestión de carritos y productos, integrando MongoDB para persistir los datos y Handlebars para las vistas.

🚀 Lo que logré implementar
1. Sistema de Carritos (Carts)
Me aseguré de que el carrito no sea solo un array de IDs, sino que sea funcional:

Suma inteligente: Si agregas un producto que ya está en el carrito, no se duplica la fila, sino que se incrementa la cantidad (quantity).

Populate: Al consultar un carrito, no solo veo el ID del producto, sino que traigo automáticamente el nombre, precio y stock gracias al .populate() de Mongoose.

Vaciado y edición: Implementé rutas para borrar un solo producto, actualizar la cantidad de uno específico (PUT) y vaciar el carrito por completo sin eliminarlo de la base de datos.

2. Gestión de Productos (Products)
Paginación: Las rutas de productos ya soportan page, limit y sort para que la navegación sea fluida.

Filtros: Se pueden filtrar productos por categoría o disponibilidad directamente desde la URL.

🛠️ Tecnologías que usé
Node.js & Express para el servidor.

MongoDB & Mongoose para la base de datos.

Handlebars para el renderizado de las vistas en el navegador.

🏁 Cómo probar el proyecto
Instalación:

Bash

npm install
Levantar el server:

Bash

npm run dev
Pruebas rápidas en Postman:
GET http://localhost:8080/api/products: Ver todos los productos (paginados).

POST http://localhost:8080/api/carts/[ID_CARRITO]/products: Agregar o sumar un producto al carrito (mandar productId y quantity por el body).

DELETE http://localhost:8080/api/carts/[ID_CARRITO]/products/[ID_PRODUCTO]: Quitar un producto puntual.

DELETE http://localhost:8080/api/carts/[ID_CARRITO]: Vaciar todo el carrito.

📝 Notas del proceso
Lo más desafiante fue manejar los IDs cuando el carrito está populado. Tuve que ajustar la lógica de los filtros y búsquedas en el CartsManager para comparar correctamente los strings de los IDs contra los objetos que devuelve Mongoose. ¡Pero ya quedó funcionando al 100%!

Alumno: Antonio Araujo
