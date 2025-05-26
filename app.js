/**
 * Initializes the game setup, including the canvas, snake, direction, and food.
 * Sets up the event listener for keydown events to change the snake's direction.
 * Starts the game loop with a setInterval to repeatedly draw the game state.
 */

function setup() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const box = 20;
    let snake = [{ x: 9 * box, y: 9 * box }];
    let direction = null;
    let changingDirection = false;
    let food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    };
    let score = 0;
    let flashing = false;
    let flashCount = 0;
    let flashInterval = null;
    let gameStarted = false;
    let game = null;

    document.addEventListener('keydown', changeDirection);

    function changeDirection(event) {
        if (changingDirection) return;
        changingDirection = true;
        const keyPressed = event.keyCode;
        const goingUp = direction === 'UP';
        const goingDown = direction === 'DOWN';
        const goingRight = direction === 'RIGHT';
        const goingLeft = direction === 'LEFT';

        if (keyPressed === 37 && !goingRight) {
            direction = 'LEFT';
            startGame();
        } else if (keyPressed === 38 && !goingDown) {
            direction = 'UP';
            startGame();
        } else if (keyPressed === 39 && !goingLeft) {
            direction = 'RIGHT';
            startGame();
        } else if (keyPressed === 40 && !goingUp) {
            direction = 'DOWN';
            startGame();
        }
    }

    function startGame() {
        if (!gameStarted && direction !== null) {
            gameStarted = true;
            game = setInterval(draw, 100);
        }
    }

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) {
                return true;
            }
        }
        return false;
    }

    function flashEffect() {
        flashing = true;
        flashCount = 0;
        flashInterval = setInterval(() => {
            flashCount++;
            if (flashCount >= 5) {
                clearInterval(flashInterval);
                flashing = false;
            }
            draw();
        }, 100);
    }

    function draw() {
        if (!gameStarted) {
            ctx.fillStyle = 'lightgreen';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw the snake
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = (i === 0) ? 'green' : 'white';
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
                ctx.strokeStyle = 'red';
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }
            
            // Draw the food
            ctx.fillStyle = 'red';
            ctx.fillRect(food.x, food.y, box, box);
            
            // Draw instructions
            ctx.fillStyle = 'black';
            ctx.font = '18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Press an arrow key to start', canvas.width/2, 30);
            
            // Draw score
            ctx.fillText('Score: ' + score, canvas.width/2, canvas.height - 10);
            
            return;
        }
        
        changingDirection = false;
        
        // Flash effect background
        if (flashing && flashCount % 2 === 0) {
            ctx.fillStyle = 'yellow';
        } else {
            ctx.fillStyle = 'lightgreen';
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the snake
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i === 0) ? 'green' : 'white';
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeStyle = 'red';
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        // Draw the food
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, box, box);

        // Draw the score
        ctx.fillStyle = 'black';
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Score: ' + score, canvas.width/2, canvas.height - 10);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === 'LEFT') snakeX -= box;
        if (direction === 'UP') snakeY -= box;
        if (direction === 'RIGHT') snakeX += box;
        if (direction === 'DOWN') snakeY += box;

        if (snakeX === food.x && snakeY === food.y) {
            // Increment score when food is eaten
            score++;
            
            // Generate new food
            food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            };
            
            // Start flash effect
            if (!flashing) {
                flashEffect();
            }
        } else {
            snake.pop();
        }

        let newHead = { x: snakeX, y: snakeY };

        if (
            snakeX < 0 ||
            snakeX >= canvas.width ||
            snakeY < 0 ||
            snakeY >= canvas.height ||
            collision(newHead, snake)
        ) {
            clearInterval(game);
            gameStarted = false;
        }

        snake.unshift(newHead);
    }

    // Initial draw to show the starting state
    draw();
}

window.onload = setup;