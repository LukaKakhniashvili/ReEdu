class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getCarInfo() {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

class ElectricCar extends Car {
  constructor(make, model, year, batteryLevel) {
    super(make, model, year);
    this.batteryLevel = batteryLevel;
  }

  getBatteryStatus() {
    return `Battery level: ${this.batteryLevel}%`;
  }
}

const myElectricCar = new ElectricCar("Tesla", "Model S", 2023, 85);

window.onload = () => {
  document.getElementById("carInfo").textContent = myElectricCar.getCarInfo();
  document.getElementById("batteryStatus").textContent =
    myElectricCar.getBatteryStatus();
};
