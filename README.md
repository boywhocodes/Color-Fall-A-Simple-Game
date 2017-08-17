## A Simple Game of Color Fall

https://boywhocodes.github.io/Color-Fall-A-Simple-Game/

## Background

There's only one thing in the world that is needed in order to become a great software developer...colors! The goal is to steer your ship to safety while avoiding the falling colors. The ship will change colors after every round and the user can collect the ships' colors' blocks for additional points. Points as well a life bar will be displayed on the page. As you steer your ship to the coding promise land, hitting the colors that don't match will result in a loss of HP. The game will end when your HP reaches 0.

## Functionality & MVP

Users will be able to:

 Render an intro page and Start the game.
 Use the ship to move left and right.
 Collect appropriate colors while avoiding the other colors.
 Levels will incrementally increase in difficulty.
 View their score and current ship life status.

## Architecture and Technologies

This project was implemented with the following technologies:

Vanilla JavaScript for overall structure and game logic,
HTML5 Canvas for DOM manipulation and rendering.
In addition to the webpack entry file, another script is involved in this project:

color_catcher.js: this script will handle the logic of the behavior of any moving objects on the screen, how they interact when they collide, how the score and HP is adjusted and how levels incrementally add difficulty to the game.

## Wireframes

Intro/Instruction Page: ![alt text](https://user-images.githubusercontent.com/26631708/28964127-6289b4ce-78c0-11e7-8143-a1342e927429.png)

Gameplay Page: ![alt text](https://user-images.githubusercontent.com/26631708/28964206-a8f3dcd2-78c0-11e7-88d5-5adfdf7d344f.png)

## Extra features worth looking into down the line:

 Varying types of colors that the user can select
 The ability to change pace of play
 Change background
 Add a time challenge, seeing how many blocks can be taken in a certain interval
