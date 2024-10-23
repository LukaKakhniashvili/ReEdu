class Employee {
  constructor(name, hoursWorked, hourlyRate) {
    this.name = name;
    this.hoursWorked = hoursWorked;
    this.hourlyRate = hourlyRate;
  }

  calculateSalary() {
    return this.hoursWorked * this.hourlyRate;
  }

  getEmployeeInfo() {
    return `${this.name} earns $${this.calculateSalary().toFixed(2)} for ${
      this.hoursWorked
    } hours at a rate of $${this.hourlyRate.toFixed(2)} per hour.`;
  }
}
const employee1 = new Employee("John Doe", 40, 15);

window.onload = () => {
  document.getElementById("employeeInfo").textContent =
    employee1.getEmployeeInfo();
};
