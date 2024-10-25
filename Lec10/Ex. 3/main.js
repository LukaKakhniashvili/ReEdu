function drawRectangle() {
  const height = parseInt(document.getElementById("height").value);
  const width = parseInt(document.getElementById("width").value);
  const rectangleDisplay = document.getElementById("rectangleDisplay");

  if (isNaN(height) || isNaN(width) || height <= 0 || width <= 0) {
    rectangleDisplay.innerText = "enter valid height and width";
    rectangleDisplay.style.color = "red";
    return;
  }

  let rectangle = "";
  for (let i = 0; i < height; i++) {
    rectangle += "#".repeat(width) + "\n";
  }

  rectangleDisplay.innerText = rectangle;
}
