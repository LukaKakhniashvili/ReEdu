class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getInfo() {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

class CarFactory {
  constructor() {
    this.cars = [];
  }

  addCar(car) {
    this.cars.push(car);
    this.displayCars();
  }

  deleteCar(carInfo) {
    this.cars = this.cars.filter((car) => car.getInfo() !== carInfo);
    this.displayCars();
  }

  updateCar(oldCarInfo, newMake, newModel, newYear) {
    const car = this.cars.find((car) => car.getInfo() === oldCarInfo);
    if (car) {
      car.make = newMake;
      car.model = newModel;
      car.year = newYear;
    }
    this.displayCars();
  }

  displayCars() {
    const carList = document.getElementById("carList");
    carList.innerHTML = "";
    this.cars.forEach((car) => {
      const li = document.createElement("li");
      li.textContent = car.getInfo();
      carList.appendChild(li);
    });
  }
}

const myCarFactory = new CarFactory();

window.onload = () => {
  document.getElementById("addCarButton").onclick = () => {
    const make = document.getElementById("carMake").value;
    const model = document.getElementById("carModel").value;
    const year = document.getElementById("carYear").value;

    if (make && model && year) {
      const newCar = new Car(make, model, year);
      myCarFactory.addCar(newCar);

      document.getElementById("carMake").value = "";
      document.getElementById("carModel").value = "";
      document.getElementById("carYear").value = "";
    }
  };

  document.getElementById("deleteCarButton").onclick = () => {
    const make = document.getElementById("carMake").value;
    const model = document.getElementById("carModel").value;
    const year = document.getElementById("carYear").value;

    if (make && model && year) {
      const carInfo = `${year} ${make} ${model}`;
      myCarFactory.deleteCar(carInfo);

      document.getElementById("carMake").value = "";
      document.getElementById("carModel").value = "";
      document.getElementById("carYear").value = "";
    }
  };

  document.getElementById("updateCarButton").onclick = () => {
    const oldMake = document.getElementById("carMake").value;
    const oldModel = document.getElementById("carModel").value;
    const oldYear = document.getElementById("carYear").value;

    const newMake = prompt("Enter new Make:");
    const newModel = prompt("Enter new Model:");
    const newYear = prompt("Enter new Year:");

    if (oldMake && oldModel && oldYear && newMake && newModel && newYear) {
      const oldCarInfo = `${oldYear} ${oldMake} ${oldModel}`;
      myCarFactory.updateCar(oldCarInfo, newMake, newModel, newYear);

      document.getElementById("carMake").value = "";
      document.getElementById("carModel").value = "";
      document.getElementById("carYear").value = "";
    }
  };
};
