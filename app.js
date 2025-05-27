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
    let direction = '';
    let changingDirection = false;
    let score = 0;
    let flashing = false;
    let flashCount = 0;
    let food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    };

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
        } else if (keyPressed === 38 && !goingDown) {
            direction = 'UP';
        } else if (keyPressed === 39 && !goingLeft) {
            direction = 'RIGHT';
        } else if (keyPressed === 40 && !goingUp) {
            direction = 'DOWN';
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

    function draw() {
        changingDirection = false;
        
        // Set background color, handle flashing if active
        if (flashing) {
            ctx.fillStyle = flashCount % 2 === 0 ? 'lightgreen' : 'yellow';
        } else {
            ctx.fillStyle = 'lightgreen';
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Display score on canvas
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 30);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i === 0) ? 'green' : 'white';
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeStyle = 'red';
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, box, box);

        // Only move if direction is set
        if (direction !== '') {
            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            if (direction === 'LEFT') snakeX -= box;
            if (direction === 'UP') snakeY -= box;
            if (direction === 'RIGHT') snakeX += box;
            if (direction === 'DOWN') snakeY += box;

        if (snakeX === food.x && snakeY === food.y) {
            // Increment score
            score++;
            
            // Trigger flash effect
            startFlashEffect();
            
            food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            };
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
        }

        snake.unshift(newHead);
    }
    
    // Function to handle the flash effect
    function startFlashEffect() {
        flashing = true;
        flashCount = 0;
        
        function flash() {
            flashCount++;
            if (flashCount < 10) { // 5 flashes = 10 state changes (on/off)
                setTimeout(flash, 100); // 0.1 second interval
            } else {
                flashing = false;
            }
        }
        
        flash();
    }
    }

    let game = setInterval(draw, 100);
}

window.onload = setup;