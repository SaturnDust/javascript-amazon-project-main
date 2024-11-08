import { cart, removeFromCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { countCartTotal } from "./utils/cartTotal.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

let cartSummaryHTML = "";

hello();

const today = dayjs();
const deliveryDate = today.add(7, "days");

updateTotalQty();

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let productQuery = {};

  products.forEach((product) => {
    if (product.id === productId) {
      productQuery = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

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
                    Quantity: <span class="quantity-label js-quantity-label-${
                      productQuery.id
                    }">${cartItem.quantity}</span>
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
      <div class="delivery-option">
        <input type="radio" class="delivery-option-input" name="delivery-option-${productQueryId}" ${
      isChecked === true ? "checked" : ""
    }> 
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
    console.log("item cart deleted");
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
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    container.classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".save-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    let inputQty = document.getElementById(productId);
    inputQty = Number(inputQty.value);

    updateQuantity(productId, inputQty);
    updateTotalQty();

    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    quantityLabel.innerHTML = inputQty;

    container.classList.remove("is-editing-quantity");
  });
});
