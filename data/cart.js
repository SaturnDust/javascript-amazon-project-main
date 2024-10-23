export const cart = [];

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
}

 