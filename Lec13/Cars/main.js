import { program } from 'commander';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const fixedDirname = __dirname.startsWith('/') ? __dirname.slice(1) : __dirname;
const carsFilePath = path.join(fixedDirname, 'cars.json');
const ensureCarsFileExists = () => {
    if (!fs.existsSync(carsFilePath)) {
        fs.writeFileSync(carsFilePath, JSON.stringify([]), 'utf-8');
        console.log('cars.json created.');
    }
};
ensureCarsFileExists();

const readCars = () => {
    try {
        const data = fs.readFileSync(carsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading cars file:', err);
        return [];
    }
};

const writeCars = (cars) => {
    try {
        fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2), 'utf-8');
    } catch (err) {
        console.error('Error writing cars file:', err);
    }
};

const addCar = (name, price, color) => {
    const cars = readCars();
    const newCar = {
        id: Date.now(),
        name,
        price,
        color
    };
    cars.push(newCar);
    writeCars(cars);
    console.log(`Car "${name}" added successfully!`);
};

const deleteCar = (id) => {
    let cars = readCars();
    cars = cars.filter((car) => car.id !== Number(id));
    writeCars(cars);
    console.log(`Car with ID ${id} deleted successfully!`);
};

const showAllCars = () => {
    const cars = readCars();
    if (cars.length === 0) {
        console.log('No cars found!');
    } else {
        console.log('Cars in the inventory:');
        cars.forEach((car) => {
            console.log(`ID: ${car.id}, Name: ${car.name}, Price: ${car.price}, Color: ${car.color}`);
        });
    }
};

const updateCar = (id, name, price, color) => {
    const cars = readCars();
    const carIndex = cars.findIndex((car) => car.id === Number(id));

    if (carIndex !== -1) {
        cars[carIndex] = {
            ...cars[carIndex],
            name,
            price,
            color
        };
        writeCars(cars);
        console.log(`Car with ID ${id} updated successfully!`);
    } else {
        console.log(`Car with ID ${id} not found!`);
    }
};

const getCarById = (id) => {
    const cars = readCars();
    const car = cars.find((car) => car.id === Number(id));

    if (car) {
        console.log(`Car found: ID: ${car.id}, Name: ${car.name}, Price: ${car.price}, Color: ${car.color}`);
    } else {
        console.log(`Car with ID ${id} not found!`);
    }
};

// CLI commands
program
    .command('add <name> <price> <color>')
    .description('Add a new car')
    .action((name, price, color) => {
        addCar(name, price, color);
    });

program
    .command('delete <id>')
    .description('Delete a car by ID')
    .action((id) => {
        deleteCar(id);
    });

program
    .command('show')
    .description('Show all cars')
    .action(() => {
        showAllCars();
    });

program
    .command('update <id> <name> <price> <color>')
    .description('Update a car by ID')
    .action((id, name, price, color) => {
        updateCar(id, name, price, color);
    });

program
    .command('get <id>')
    .description('Get a car by ID')
    .action((id) => {
        getCarById(id);
    });
program.parse(process.argv);
