// 1. Write a function that takes two or more objects as arguments and merges them into a single object
function mergeObjects(...objects) {
  return objects.reduce((acc, obj) => {
    return { ...acc, ...obj };
  }, {});
}
const obj1 = { num1: 1, num2: 2 };
const obj2 = { num3: 3, num4: 4 };
const obj3 = { num5: 5, num6: 6 };
const merged = mergeObjects(obj1, obj2, obj3);
console.log(merged);

// 2. Write a function that takes an object and a key as input and deletes the specified key from the object.
function deleteKeys(obj, key) {
  delete obj[key];
}
const myObject = { num1: 1, num2: 2, num3: 3 };
deleteKeys(myObject, "num2");
console.log(myObject);

// 3. Create an object representing a car with properties for make, model, and year. Then add a method that returns the car's full description.
const car = {
  make: "Audi",
  model: "A7",
  year: 2020,

  getCarDescription: function () {
    return `${this.make} ${this.model} ${this.year}`;
  },
};
console.log(car.getCarDescription());

// 4. Create an object representing a shopping cart. Add methods to add items, remove items, and calculate the total price.
const shoppingCart = {
  mobiles: [
    {
      make: "samsung",
      model: "galaxy s24",
      price: 2000,
    },
    {
      make: "samsung",
      model: "galaxy s24 ultra",
      price: 3500,
    },
    {
      make: "apple",
      model: "iphone 15",
      price: 2500,
    },
    {
      make: "apple",
      model: "iphone 15 pro",
      price: 3500,
    },
    {
      make: "apple",
      model: "iphone 15 pro max",
      price: 4500,
    },
  ],

  addItem: function (make, model) {
    const mobile = this.mobiles.find(
      (item) => item.make === make && item.model === model
    );
    if (mobile) {
      mobile.quantity = (mobile.quantity || 0) + 1;
    } else {
      console.log("Error! Mobile not found.");
    }
  },

  removeItem: function (make, model) {
    const index = this.mobiles.findIndex(
      (item) => item.make === make && item.model === model
    );
    if (index !== -1) {
      if (this.mobiles[index].quantity > 1) {
        this.mobiles[index].quantity -= 1;
      } else {
        this.mobiles.splice(index, 1);
      }
    } else {
      console.log("Error! Mobile not found in cart.");
    }
  },

  calculateTotal: function () {
    return this.mobiles.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  },
};

shoppingCart.addItem("samsung", "galaxy s24 ultra");
shoppingCart.addItem("apple", "iphone 15 pro max");
console.log(shoppingCart.mobiles);

const totalPrice = shoppingCart.calculateTotal();
console.log(`Total price: ${totalPrice}`);

shoppingCart.removeItem("samsung", "galaxy s24");
shoppingCart.removeItem("apple", "iphone 15");
shoppingCart.removeItem("apple", "iphone 15 pro");
console.log(shoppingCart.mobiles);
