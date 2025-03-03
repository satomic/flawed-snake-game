# Flawed Snake Game

This is a simple implementation of the classic Snake game using HTML, CSS, and JavaScript.

## How to Play

1. Open `index.html` in your web browser.
2. Use the arrow keys on your keyboard to control the direction of the snake.
3. The objective is to eat the food that appears on the screen. Each time the snake eats food, it grows longer.
4. Avoid running into the walls or into yourself.

## Additional Notes

- The game is responsive and should work on most modern browsers.
- You can modify the styles in `style.css` to change the appearance of the game.
- The game logic can be found in `app.js`, where you can also add new features or improve the gameplay.

## Prompt
In fact, this is a project for Demo Copilot Agent/Edit/Workspace. You will find many problems when playing the game. Use the following prompts to let AI modify the program.
```
Add the following features
1. Add scoring, each time you eat a food, you will get +1 point.
2. After eating a food, add a flash effect, flash 5 times, and the flash interval is 0.1 seconds.
3. Do not initialize the direction, let the player decide the initialization direction.
4. Do not use black as the background color of the web page, change it to white.
```
或者中文也可以
```
增加如下特性
1. 增加记分，每次增加吃了一个食物就+1分。
2. 当吃下一个食物后，增加闪光特效，闪烁5次，闪烁间隔为0.1秒。
3. 不要初始化方向，由玩家决定初始化方向。
4. 网页背景颜色不要用黑色，改为白色。
```