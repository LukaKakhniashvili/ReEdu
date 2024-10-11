const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function searchProducts(query) {
  if (query.trim() === "") {
    resultsContainer.innerHTML = "";
    return;
  }

  fetch(
    `https://api.escuelajs.co/api/v1/products?title=${encodeURIComponent(
      query
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      displayResults(data);
    })
    .catch((error) => console.error("Error:", error));
}

function displayResults(products) {
  resultsContainer.innerHTML = "";

  if (products.length === 0) {
    resultsContainer.innerHTML = "<p>No products found</p>";
    return;
  }

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const productImage =
      product.images && product.images.length > 0 ? product.images[0] : "";

    productElement.innerHTML = `
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        ${
          productImage
            ? `<img src="${productImage}" alt="${product.title}" width="100"/>`
            : `<p>[Image not available for ${product.title}]</p>`
        }
      `;
    resultsContainer.appendChild(productElement);
  });
}

searchInput.addEventListener(
  "input",
  debounce((event) => {
    searchProducts(event.target.value);
  }, 300)
);
