import fetch from 'node-fetch';
import { program } from 'commander';

const API_KEY = '895284fb2d2c50a520ea537456963d9c';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

program
    .argument('<city>', 'City name')
    .action(async (city) => {
        try {
            const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error! City not found: ${city}`);
            }
            const data = await response.json();
            const temperature = data.main.temp;
            console.log(`The temperature in ${city} is ${temperature}°C`);
        } catch (error) {
            console.error(error.message, "Error");
        }
    });
program.parse(process.argv);
