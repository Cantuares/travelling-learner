let coordinates = [
  [1, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 3, 0, 0],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

const map = document.querySelector(".map");
const player = document.createElement("div");
player.classList.add("player");

let playerCoords = {
  x: 0,
  y: 0,
};

const images = {
  0: "stone-block",
  1: "grass-block",
  2: "water-block",
  3: "rock",
  4: "key",
};

function loadCoordinates() {
  map.appendChild(player);
  player.style.left = `${playerCoords.x * 101}px`;
  player.style.top = `${playerCoords.y * 85}px`;

  for (row of coordinates) {
    const rows = document.createElement("div");
    rows.classList.add("row", "flex");
    map.appendChild(rows);
    for (column of row) {
      const grass = document.createElement("div");
      if (images[column]) {
        grass.classList.add("block", images[column]);
      } else {
        grass.classList.add("block", images[0]);
      }
      rows.appendChild(grass);
    }
  }
}

document.addEventListener("keydown", function (event) {
  const left = player.style.left.match(/\d+/) || [0];
  const top = player.style.top.match(/\d+/) || [0];
  const valueLeft = parseInt(left[0]);
  const valueTop = parseInt(top[0]);

  switch (event.key) {
    case "ArrowRight":
      switch (coordinates[playerCoords.y][playerCoords.x + 1]) {
        case 1:
          player.style.left = `${valueLeft + 101}px`;
          playerCoords.x++;
          break;
        case 4:
          const keyE = [...map.children].slice(1)[playerCoords.y].children[
            [playerCoords.x + 1]
          ];
          console.log(keyE);
          keyE.classList.remove(images[4]);
          keyE.classList.add(images[1]);
          player.style.left = `${valueLeft + 101}px`;
          playerCoords.x++;
          coordinates[playerCoords.y][playerCoords.x] = 1;
          break;

        default:
          break;
      }
      break;
    case "ArrowLeft":
      if (coordinates[playerCoords.y][playerCoords.x - 1] === 1) {
        player.style.left = `${valueLeft - 101}px`;
        playerCoords.x--;
      }
      break;
    case "ArrowDown":
      if (coordinates[playerCoords.y + 1][playerCoords.x] === 1) {
        player.style.top = `${valueTop + 85}px`;
        playerCoords.y++;
      }
      break;
    case "ArrowUp":
      if (coordinates[playerCoords.y - 1][playerCoords.x] === 1) {
        player.style.top = `${valueTop - 85}px`;
        playerCoords.y--;
      }
      break;
    default:
      break;
  }
});

Ace.mode = "javascript";
Ace.start();
Ace.editor.session.on("change", function () {
  setTimeout(() => {
    const errors = Ace.editor.getSession().getAnnotations();
    if (errors.length) return;
    coordinates = eval(`(${Ace.editor.getValue()})()`);
    $(".map").empty();
    loadCoordinates();
  }, 550);
});
loadCoordinates();
