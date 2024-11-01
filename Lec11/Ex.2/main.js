// 2. Run the command node main.js Ferrari 2020 red, retrieve the data from process.argv, and build a car object with the properties id, carModel, carColor, and carReleaseDate. Append this object to cars.json. Each time you run this command, a new object should be added to cars.json, so if you run it five times, you should have five objects in the file.

const fs = require("fs");

const args = process.argv.slice(2);

if (args.length < 3) {
  console.error(
    "Please provide all arguments: carModel, carReleaseDate, carColor"
  );
  process.exit(1);
}

const [carModel, carReleaseDate, carColor] = args;

const carId = Date.now();

const car = {
  id: carId,
  carModel: carModel,
  carReleaseDate: carReleaseDate,
  carColor: carColor,
};

const filePath = "cars.json";
let cars = [];

try {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    cars = JSON.parse(data);
  }
} catch (error) {
  console.error("Error reading the file:", error);
}

cars.push(car);

try {
  fs.writeFileSync(filePath, JSON.stringify(cars, null, 2), "utf8");
  console.log("Car added successfully!");
} catch (error) {
  console.error("Error writing to the file:", error);
}
