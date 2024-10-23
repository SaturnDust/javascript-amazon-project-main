import{cart} from '../data/cart.js';
import{products} from '../data/products.js';

let productHTML = "";

products.forEach((product) => {
  productHTML += `
    <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${
            product.rating.stars * 10
          }.png">
          <div class="product-rating-count link-primary">
          ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-alert-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${
          product.id
        }">
          Add to Cart
        </button>
    </div>`;
});

document.querySelector(".js-products-grid").innerHTML = productHTML;

//add to cart function 
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const qtySelect = Number(document.querySelector('.js-quantity-selector-'+productId).value);

    let matchingItem;
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
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
    
    //Mengupdate Total
    let TotalCart = 0;
    cart.forEach((item) =>{
      TotalCart += item.quantity;      
    });
    document.querySelector('.js-cart-quantity').innerHTML = TotalCart;

    console.log(cart);

    //Added item to cart button alert
    const addedAlert = document.querySelector('.js-added-alert-'+productId)
    const addedAlertTimeout = setTimeout (() =>{
      addedAlert.classList.remove('active');
    }, 800);
    addedAlert.classList.add('active');
  });
});
