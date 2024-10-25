import { cart } from "../../data/cart.js";

export function countCartTotal() {
  let TotalCart = 0;
  cart.forEach((cartItem) => {
    TotalCart += cartItem.quantity;
  });
  return TotalCart; 
}
