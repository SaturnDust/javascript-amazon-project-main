export const cart = [
  {
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2
  },
  {
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1
  }
];

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

 