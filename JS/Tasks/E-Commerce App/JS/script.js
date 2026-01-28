// localstorage Function

function storeLT(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}
function getLT(name) {
  return JSON.parse(localStorage.getItem(name));
}

//localstorage for all Users Data
let ProductsData = getLT("ProductsData");
if (!ProductsData) {
  storeLT("ProductsData", []);
  ProductsData = [];
}

let CartList = getLT("CartList");
if (!CartList) {
  storeLT("CartList", []);
  CartList = [];
}

let UserDetails = getLT("UserDetails");
if (!UserDetails) {
  storeLT("UserDetails", { isLogin: true });
  UserDetails = {};
}
// Products Page

async function safeFetch(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

// fetching Products from url

const ProductLink = "https://dummyjson.com/products";

async function ProductFunction(ProductLink) {
  let productData = [];

  productData = getLT("ProductsData");

  if (productData.length === 0) {
    productData = await safeFetch(ProductLink);
    productData = productData.products;
    storeLT("ProductsData", productData);
  }

  return productData;
}

//ListOuts Products
async () => {
  if (ProductsData.length === 0) {
    ProductsData = await ProductFunction(ProductLink);
  }
};

async function renderProducts(productList = []) {
  const productSection = document.getElementById("product-div");
  const noProduct = document.getElementById("no-product");
  if (productList.length === 0) {
    productList = await ProductFunction(ProductLink);
    noProduct.classList.remove("hidden");
    productSection.classList.add("hidden");
    return null;
  }

  noProduct.classList.add("hidden");
  productSection.classList.remove("hidden");
  productSection.innerHTML = "";

  productList.forEach((product) => {
    const ProductCartTeg = document.createElement("div");
    ProductCartTeg.innerHTML = `
            <div class="bg-white p-4 rounded-lg shadow">
                <img
                  src=${product.thumbnail}
                  alt="Product Image"
                  class="w-full h-64 object-cover mb-4 rounded"
                />
                <h3 class="text-lg font-bold mb-2">${product.title}</h3>
                <p class="text-gray-700 mb-4">$ ${product.price}</p>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" data-product-id="${product.id}"
                >
                  Add to Cart
                </button>
            </div>
        `;
    productSection.append(ProductCartTeg);
  });
}

renderProducts(ProductsData);

const addCartButton = document.querySelectorAll("[data-product-id]");

addCartButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    // if(!(CartList.find((product) => product.id == button.dataset.productId))){
    addToCart(button.dataset.productId);
    // }
  });
});

function addToCart(id) {
  let getProduct;
  const okButton = document.getElementById("ok-button")
         okButton.classList.add("bg-green-600");
        okButton.classList.add("hover:bg-green-700");
        okButton.classList.remove("bg-red-500");
        okButton.classList.remove("hover:bg-red-700");


        const checkoutMessage = document.getElementById("checkout-message");
        checkoutMessage.innerHTML = "Product Checkout successfully..";


  ProductsData = ProductsData.map((product) => {
    if (product.id == id) {
      product.stock -= 1;
      getProduct = JSON.parse(JSON.stringify(product));
      return product;
    }

    return product;
  });

  if (CartList.length === 0) {
    CartList.push({ id: getProduct.id, quantity: 1, product: getProduct });
  } else {
    if (!CartList.find((product) => product.id == id)) {
      CartList.push({ id: getProduct.id, quantity: 1, product: getProduct });
    } else {
      CartList = CartList.map((product) => {
        if (product.id == id) {
          product.quantity += 1;
          return product;
        }
        return product;
      });
    }
  }

  storeLT("CartList", CartList);
  storeLT("ProductsData", ProductsData);
  cartRender(CartList);
}

//Cart section Render Function

function cartRender(CartList = []) {
  if (CartList.length == 0) {
    CartList = getLT("CartList");
  }
  if (CartList.length == 0) {
    const emptyCart = document.getElementById("empty-Cart");
    const itemCart = document.getElementById("item-cart");
    itemCart.classList.add("hidden");
    emptyCart.classList.remove("hidden");
  } else {
    const emptyCart = document.getElementById("empty-Cart");
    const itemCart = document.getElementById("item-cart");
    itemCart.classList.remove("hidden");
    emptyCart.classList.add("hidden");
  }
  console.log(CartList);

  const CartBox = document.getElementById("item-cart");
  const subtotal = document.getElementById("subtotal");
  const tax = document.getElementById("tax");
  const total = document.getElementById("total");

  CartBox.innerHTML = "";
  CartList.map((product) => {
    const newItem = document.createElement("div");
    newItem.className =
      "flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow";
    newItem.innerHTML = `
  <div class="flex w-full items-center">
    <img src=${product.product.thumbnail} alt="Product Image" class="w-16 h-16 object-cover rounded mr-4" />
    <div class="flex-1  flex space-between">
      <div class="flex flex-col">

        <h3 class="text-lg font-bold">${product.product.title}</h3>
        <p class="text-gray-700">$ ${product.product.price}</p>
      </div>
    </div>
    <div class="flex ">
      <div class="ml-4 flex flex-col items-center">
        <label for="quantity" class="mr-2">Quantity:</label>
        <input type="number" id="quantity" name="quantity" value=${product.quantity} min="1"
          max=${product.product.stock} class="w-16 border border-gray-300 rounded px-2 py-1"
          data-product-id=${product.id} />
      </div>

      <div class="ml-4 flex flex-col items-center">
        <button class="bg-red-500 text-white m-auto px-4 py-2 rounded hover:bg-red-600" data-delete-id=${product.id}>
          Remove
        </button>
      </div>
    </div>
  </div>
        `;
    CartBox.append(newItem);
  });

  const payment = totalPayment(CartList);
  subtotal.innerText = payment[0];
  tax.innerText = payment[1];
  total.innerText = payment[2];

  onQuantityChange();
  deleteItem();
  onCheckout(CartList);
}

// cartRender(CartList);

function totalPayment(CartList) {
  let subtotal = 0;
  let tax = 0;
  let total = 0;

  CartList.forEach((product) => {
    subtotal += product.quantity * product.product.price;
  });

  tax = (subtotal / 100) * 18;
  total = subtotal + tax;
  return [subtotal.toFixed(2), tax.toFixed(2), total.toFixed(2)];
}

function onQuantityChange() {
  const Quantity = document.querySelectorAll("[data-product-id]");
  Quantity.forEach((item) => {
    item.addEventListener("input", (event) => {
      CartList = CartList.map((product) => {
        if (product.id == item.dataset.productId) {
          product.quantity = Number(event.target.value);
          return product;
        }
        return product;
      });
      storeLT("CartList", CartList);
      cartRender(CartList);
    });
  });
}

function CartEmpty() {
  const emptyCart = document.getElementById("empty-Cart");
  const itemCart = document.getElementById("item-cart");
  itemCart.classList.add("hidden");
  emptyCart.classList.remove("hidden");
  storeLT("CartList", []);
}

// CartEmpty()

function deleteItem() {
  const DeleteButtons = document.querySelectorAll("[data-delete-id]");
  // console.log(DeleteButtons);

  DeleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      CartList = CartList.filter((item) => {
        return item.id != button.dataset.deleteId;
      });
      console.log(CartList);
      cartRender(CartList);
    });
  });

  storeLT("CartList", CartList);
}

function onCheckout(CartList) {
  if (UserDetails.isLogin) {
    const checkoutButton = document.getElementById("checkout-button");
    const checkout = document.getElementById("Checkout");
    const okButton = document.getElementById("ok-button");

    checkoutButton.addEventListener("click", () => {


      checkout.classList.remove("hidden");

           const checkoutMessage = document.getElementById("checkout-message");
           if(CartList.length == 0){

               checkoutMessage.innerHTML = "Your cart is empty.";
               okButton.classList.remove("bg-green-600");
               okButton.classList.remove("hover:bg-green-700");
               okButton.classList.add("bg-red-500");
               okButton.classList.add("hover:bg-red-700");
            }
               
      CartEmpty();
    });
  }
  okButtonFunction();
}

function okButtonFunction() {
  console.log("click");
  const okButton = document.getElementById("ok-button")
  
        if (CartList.length === 0) {
        const checkoutMessage = document.getElementById("checkout-message");
        checkoutMessage.innerHTML = "Your cart is empty.";
        okButton.classList.remove("bg-green-600");
        okButton.classList.remove("hover:bg-green-700");
        okButton.classList.add("bg-red-500");
        okButton.classList.add("hover:bg-red-700");
      };
  okButton.addEventListener("click", () => {
    const checkout = document.getElementById("Checkout");
    checkout.classList.add("hidden");
  });
}
