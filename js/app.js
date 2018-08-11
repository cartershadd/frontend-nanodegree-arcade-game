// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100 - (Math.random() * 500);
    this.y = 50 + (Math.floor(Math.random() * 3) * 85);
    this.speed = (Math.random() * 250);
    this.height = 50;
    this.width = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 505) {
      this.x = -100;
      this.y = 50 + (Math.floor(Math.random() * 3) * 85);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {


  this.sprite = 'images/char-cat-girl.png';
  this.height = 50;
  this.width = 50;
  this.x = 200;
  this.y = 400;
};

// Makes player reset if the player and enemy collide.
Player.prototype.update = function(dt) {
  allEnemies.forEach(function(enemy) {
    // Player and enemy will collide if they share the same square,
    // but the size of their avatar is also taken into account.
    if (player.x + player.width > enemy.x &&
      player.y + player.height > enemy.y &&
      enemy.x + enemy.width > player.x &&
      enemy.y + enemy.height > player.y) {
        player.x = 200;
        player.y = 400;
    }
  });
  // Resets player position and sends a message
  // when you reach the water.
  if (this.y < 10) {
    alert("Let's go for a swim!");
    this.x = 200;
    this.y = 400;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This allows user to move the player with the arrow keys.
// Player cannot move offscreen either left, right or down
Player.prototype.handleInput = function(direction) {
    this.direction = direction;
    if (this.direction === 'left' && this.x > 0) {
      this.x -= 100;
    } else if (this.direction === 'right' && this.x < 400) {
      this.x += 100;
    } else if (this.direction === 'up') {
      this.y -= 85;
    } else if (this.direction === 'down' && this.y < 400) {
      this.y += 85;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
