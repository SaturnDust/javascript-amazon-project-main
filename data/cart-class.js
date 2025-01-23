// class is a better wat to generate object in object-oriented programming
class Cart {
    cartItems;
    localStorageKey;

    // we should not return anything from a constructor
    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }
 
    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
      
      // if(!this.cartItems){ 
      //   this.cartItems = [
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
    }

    safeToStorage(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId, qtySelect) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
      
        /*kondisi pengecekan jika item yang sama di cart sama tidak perlu duplikat
            melainkan hanya perlu menambahkan ke produk yang sudah ada*/
        if (matchingItem) {
          matchingItem.quantity += qtySelect;
        } else {
          this.cartItems.push({
            productId: productId,
            quantity: qtySelect,
            deliveryOptionId: '1'
          });
        }
        
        this.safeToStorage();
    }
    
    removeFromCart(productId) {
        const newCart = [];
      
        this.cartItems.forEach((cartItem) =>{
          if(cartItem.productId !== productId){
            newCart.push(cartItem);
          }
        });
        this.cartItems = newCart;
      
        this.safeToStorage();

    }

    updateQuantity(productId, newQuantity){
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
        matchingItem.quantity = newQuantity;
        
        this.safeToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
      
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.safeToStorage();
    }

    countCartTotal() {
        let TotalCart = 0;
        this.cartItems.forEach((cartItem) => {
          TotalCart += cartItem.quantity;
        });
        return TotalCart; 
    }
}

//genereta new object using our class
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



console.log(cart);
console.log(businessCart);
// console.log(
//     businessCart instanceof Cart
// );


 
