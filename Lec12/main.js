const fs = require("fs");
const http = require("http");
const path = require("path");

// 1) Create a function that checks if a received folder name exists in the root directory.
function folderExists(folderName) {
  return fs.existsSync(path.join(__dirname, folderName));
}

// 2) Create a simple HTTP GET server that reads user data from data.json and returns it to the client. Ensure that data.json is present before reading the data.
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      const homePageContent = `
        <html>
            <head>
                <title>Lec 12</title>
                <link rel="stylesheet" type="text/css" href="/styles.css"> <!-- Link to the external CSS -->
            </head>
            <body>
                <h1>Lec 12 - Homework</h1>
                <p>Select a route below:</p>
                <ul>
                    <li><a href="/data">Data (User Data)</a></li>
                    <li><a href="/random">Random Number</a></li>
                    <li><a href="/html">HTML Table</a></li>
                    <li><a href="/current-time">Current Time</a></li>
                    <li><a href="/api">API Data Table</a></li>
                </ul>
            </body>
        </html>
    `;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(homePageContent);
    } else if (req.url === "/styles.css") {
      const filePath = path.join(__dirname, "styles.css");
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error loading CSS file");
        } else {
          res.writeHead(200, { "Content-Type": "text/css" });
          res.end(data);
        }
      });
    }

    // 2) Route to read user data from data.json
    else if (req.url === "/data") {
      const dataFilePath = path.join(__dirname, "data.json");
      if (fs.existsSync(dataFilePath)) {
        fs.readFile(dataFilePath, "utf-8", (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to read data.json" }));
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
          }
        });
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "data.json not found" }));
      }
    }

    // 3) Add a new route that returns a random number between 1 and 100 at /random.
    else if (req.url === "/random") {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ randomNumber }));
    }

    // 4) Add a new route that returns a simple HTML table at /html.
    else if (req.url === "/html") {
      const htmlContent = `
                <html>
                    <body>
                        <h1>Sample Table</h1>
                        <table border="1">
                            <tr><th>ID</th><th>Name</th></tr>
                            <tr><td>1</td><td>Giorgi</td></tr>
                            <tr><td>2</td><td>Nika</td></tr>
                            <tr><td>2</td><td>Mariami</td></tr>
                            <tr><td>2</td><td>Nino</td></tr>
                        </table>
                    </body>
                </html>
            `;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlContent);
    }

    // 5) Add a new route that returns the current time in ISO format at /current-time.
    else if (req.url === "/current-time") {
      const currentTime = new Date().toISOString();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ currentTime }));
    }

    // 6) Add a new route that returns an array of objects, such as users, animals, posts, etc., at /api.
    else if (req.url === "/api") {
      const data = [
        { id: 1, type: "user", name: "Giorgi" },
        { id: 2, type: "user", name: "Nika" },
        { id: 3, type: "animal", name: "Jeka", species: "dog" },
        {
          id: 4,
          type: "post",
          title: "Tutorial",
          content: "learn how to build servers with Node.js",
        },
      ];

      let htmlContent = `
                <html>
                    <body>
                        <h1>Data Table</h1>
                        <table border="1">
                            <tr><th>ID</th><th>Type</th><th>Name</th><th>Species/Content</th></tr>
            `;

      data.forEach((item) => {
        htmlContent += `<tr>
                                    <td>${item.id}</td>
                                    <td>${item.type}</td>
                                    <td>${item.name || "-"}</td>
                                    <td>${
                                      item.species || item.content || "-"
                                    }</td>
                                </tr>`;
      });

      htmlContent += `
                        </table>
                    </body>
                </html>
            `;

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlContent);
    }

    else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route not found" }));
    }
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method not allowed" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

console.log('Folder "exampleFolder" exists:', folderExists("exampleFolder"));
