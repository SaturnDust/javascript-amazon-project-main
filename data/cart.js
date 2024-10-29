export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [];
}

function safeToStorage(){
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
 