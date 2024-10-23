class Item {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.price * this.quantity;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
    this.displayCart();
  }

  deleteItem(itemName) {
    this.items = this.items.filter((item) => item.name !== itemName);
    this.displayCart();
  }

  updateItem(itemName, newQuantity) {
    const item = this.items.find((item) => item.name === itemName);
    if (item) {
      item.quantity = newQuantity;
    }
    this.displayCart();
  }

  calculateTotal() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  displayCart() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";
    this.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name}: $${item.price.toFixed(2)} x ${
        item.quantity
      } = $${item.getTotalPrice().toFixed(2)}`;
      cartList.appendChild(li);
    });

    document.getElementById(
      "total"
    ).textContent = `Total: $${this.calculateTotal().toFixed(2)}`;
  }
}

const myCart = new ShoppingCart();

window.onload = () => {
  document.getElementById("addItemButton").onclick = () => {
    const name = document.getElementById("itemName").value;
    const price = parseFloat(document.getElementById("itemPrice").value);
    const quantity = parseInt(document.getElementById("itemQuantity").value);

    if (name && !isNaN(price) && !isNaN(quantity)) {
      const newItem = new Item(name, price, quantity);
      myCart.addItem(newItem);

      document.getElementById("itemName").value = "";
      document.getElementById("itemPrice").value = "";
      document.getElementById("itemQuantity").value = "";
    }
  };

  document.getElementById("deleteItemButton").onclick = () => {
    const name = document.getElementById("itemName").value;
    myCart.deleteItem(name);
  };

  document.getElementById("updateItemButton").onclick = () => {
    const name = document.getElementById("itemName").value;
    const newQuantity = parseInt(document.getElementById("itemQuantity").value);
    if (!isNaN(newQuantity)) {
      myCart.updateItem(name, newQuantity);
    }
  };
};
