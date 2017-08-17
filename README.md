## A Simple Game of Color Fall

https://boywhocodes.github.io/Color-Fall-A-Simple-Game/

## Background

There's only one thing in the world that is needed in order to become a great software developer...colors! The goal is to steer your ship to safety while avoiding the falling colors. The ship will change colors after every round and the user can collect the ships' colors' blocks for additional points. Points as well a life bar will be displayed on the page. As you steer your ship to the coding promise land, hitting the colors that don't match will result in a loss of HP. The game will end when your HP reaches 0

## Functionality & MVP

Users will be able to:

 Render an intro page and Start the game.
 Use the ship to move left and right.
 Collect appropriate colors while avoiding the other colors.
 Levels will incrementally increase in difficulty.
 View their score and current ship life status.

## Architecture and Technologies

This project will be implemented with the following technologies:

Vanilla JavaScript for overall structure and game logic,
HTML5 Canvas for DOM manipulation and rendering.
In addition to the webpack entry file, there will be one script involved in this project:

color_catcher.js: this script will handle the logic of the behavior of any moving objects on the screen, how they interact when they collide, how the score and HP is adjusted and how levels incrementally add difficulty to the game.

## Wireframes

Intro/Instruction Page: ![alt text](https://user-images.githubusercontent.com/26631708/28964127-6289b4ce-78c0-11e7-8143-a1342e927429.png)

Gameplay Page: ![alt text](https://user-images.githubusercontent.com/26631708/28964206-a8f3dcd2-78c0-11e7-88d5-5adfdf7d344f.png)

## Implementation Timeline

Day 1: Setup all necessary Node modules, including getting webpack up and running. Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of all scripts outlined above. Do some researches how to create animation with sprites. Goals for the day:

Get a green bundle with webpack
Learn enough animation with sprites and render an object to the Canvas element
Day 2: Create color_catcher object and its logic. Goals for the day:

Complete the ship functionality and make sure that movement is present.
Update game logic when the collision happens with another block.
Day 3: Enhance 'color_catcher' and connect to HTML file. Goals for the day:

Complete rendering of game field, ship with changing colors.
Render a square block to the Canvas.
Implement random functionality and collision awareness into blocks.
Day 4: Install the controls for the user to interact with the game. Style the frontend, making it polished and professional with it's beautiful tones of simplicity. Goals for the day:

Create controls for the game
Have a styled Canvas, nice looking controls,title, and game over page
Polish the game with enhanced effects while maintaining minimalistic approach.
Bonus features

## Extra features worth looking into down the line:

 Varying types of colors.
 The ability to change level of difficulty
 Change background
 Add a time challenge, seeing how many blocks can be taken in a certain interval
