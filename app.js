function setup() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const box = 20;
    let snake = [{ x: 9 * box, y: 9 * box }];
    let direction = 'RIGHT';
    let changingDirection = false;
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
        ctx.fillStyle = 'lightgreen';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i === 0) ? 'green' : 'white';
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeStyle = 'red';
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === 'LEFT') snakeX -= box;
        if (direction === 'UP') snakeY -= box;
        if (direction === 'RIGHT') snakeX += box;
        if (direction === 'DOWN') snakeY += box;

        if (snakeX === food.x && snakeY === food.y) {
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

    let game = setInterval(draw, 100);
}

window.onload = setup;