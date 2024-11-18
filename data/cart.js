export let cart = JSON.parse(localStorage.getItem('cart')) || [];

// if(!cart){
//   cart = [
//     {
//       productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//       quantity : 26,
//       deliveryOptionId : '1'
//     },
//     {
//       productId : '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
//       quantity : 3,
//       deliveryOptionId : '2'
//     }
//   ];
// }

function safeToStorage(){
  console.log(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function addToCart(productId, qtySelect) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  /*kondisi pengecekanjika item yang sama di cart sama tidak perlu duplikat
      melainkan hanya perlu menambahkan ke produk yang sudah ada*/
  if (matchingItem) {
    matchingItem.quantity += qtySelect;
  } else {
    cart.push({
      productId: productId,
      quantity: qtySelect,
      deliveryOptionId: '1'
    });
  }
  
  safeToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) =>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  safeToStorage();
}


export function updateQuantity(productId, newQuantity){
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;
  
  safeToStorage();
};

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  safeToStorage();
};
 