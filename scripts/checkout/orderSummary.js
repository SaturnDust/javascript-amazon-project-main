import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { countCartTotal } from "../utils/cartTotal.js";
// import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";


//hello();

// const today = dayjs();
// const deliveryDate = today.add(7, "days");

//updateTotalQty();

export function renderOrderSummary() {

  let cartSummaryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const productQuery = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption= getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${
          productQuery.id
        }">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image" src="${productQuery.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${productQuery.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(productQuery.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${productQuery.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id = "${
                      productQuery.id
                    }">
                      Update
                    </span>
                    <input class="quantity-input" id="${productQuery.id}"></input>
                    <span class="save-quantity-link link-primary js-save-link" data-product-id = "${
                      productQuery.id
                    }">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${
                      productQuery.id
                    }"> 
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>

                  ${deliveryOptionsHtml(productQuery.id, cartItem)}
                  
                </div>
              </div>
            </div>
        `;
  });
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  function deliveryOptionsHtml(productQueryId, cartItem) {
    let html = "";

    deliveryOptions.forEach((diliveryOpt) => {
      const today = dayjs();
      const deliveryDate = today.add(diliveryOpt.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        diliveryOpt.priceCents === 0
          ? "Free"
          : `$${formatCurrency(diliveryOpt.priceCents)} `;

      let isChecked = diliveryOpt.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-update-delivery-option" data-product-id="${productQueryId}" data-delivery-option-id="${diliveryOpt.id}">
          <input type="radio" class="delivery-option-input" name="delivery-option-${productQueryId}" ${isChecked === true ? "checked" : ""}> 
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - ${diliveryOpt.deliveryDays} day Shipping
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  function updateTotalQty() {
    document.querySelector(
      ".js-cart-quantity"
    ).innerHTML = `${countCartTotal()} items`;
  }

  //DELETE ITEM CART event
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      // console.log("item cart deleted");
      const productId = link.dataset.productId;

      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      updateTotalQty();
    });
  });

  //UPDATE ITEM CART event
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      
      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.style.display = "none";

      document.getElementById(`${productId}`).value = quantityLabel.innerHTML;

      
      container.classList.add("is-editing-quantity");
    });
  });

  //Action save quantity baru
  document.querySelectorAll(".save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      let inputQty = document.getElementById(productId);
      inputQty = Number(inputQty.value);
      
      if(inputQty !== 0){
        updateQuantity(productId, inputQty);
        updateTotalQty();
        quantityLabel.innerHTML = inputQty;
        quantityLabel.style.display = "inline-block";
      } else {
        alert('Produk setidaknya berisi 1 item');
        quantityLabel.style.display = "inline-block";
      }
    

      container.classList.remove("is-editing-quantity");
    });
  });

  //Update Delivery Selection
  document.querySelectorAll('.js-update-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      
      //shorthand property sample
      const {productId, deliveryOptionId} = element.dataset;

      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    })
  });
};
