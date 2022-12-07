const socket = io();

const messageForm = document.getElementById("messageForm");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");
const messagesPool = document.getElementById("messagesPool");

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Agarramos el valor del mensaje y del username
  const message = messageInput.value;
  const username = emailInput.value;

  // Emitimos el evento DESDE EL CLIENTE "client:message" mandandole al servidor la informacion del mensaje
  socket.emit("client:message", { username, message });
});

// Nos ponemos a escuchar el evento "server:message"
socket.on("server:messages", (messages) => {
  // Vaciamos el messagesPool para que los mensajes no se dupliquen
  messagesPool.innerHTML = "";

  // Iteramos sobre el arreglo de mensajes que nos llega y por aca uno le insertamos in li al messagesPool
  messages.forEach((message) => {
    messagesPool.innerHTML += `<li>${message.username}: ${message.message}</li>`;
  });
});

const productForm = document.getElementById("productForm");
const nameInput = document.getElementById("nameInput");
const productPool = document.getElementById("productPool");
const priceInput = document.getElementById("priceInput");
const thumbnail = document.getElementById("thumbnail");

productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Agarramos el valor del mensaje y del username
  const name = nameInput.value;
  const price = priceInput.value;
  const image = thumbnail.value;

  // Emitimos el evento DESDE EL CLIENTE "client:product" mandandole al servidor la informacion del mensaje
  socket.emit("client:product", { name, price, thumbnail });
});

// Nos ponemos a escuchar el evento "server:product"
socket.on("server:product", (products) => {
  // Vaciamos el messagesPool para que los mensajes no se dupliquen
  productPool.innerHTML = "";

  // Iteramos sobre el arreglo de mensajes que nos llega y por aca uno le insertamos in li al messagesPool
  products.forEach((product) => {
    productPool.innerHTML += `<li>Nombre: ${product.name} Precio: ${product.price}</li> <img src="${product.thumbnail}" width=50>`;
  });
});
