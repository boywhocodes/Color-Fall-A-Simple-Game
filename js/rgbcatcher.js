function rand(min, max)
{
	return Math.random() * (max-min) + min;
}

let canvas;
let context;
let keyOn = [];


let Movable = function(data)
{
	if (data === undefined)
		return;

	for (let i = 0; i < data.length; i++)
	{
		let setting = data[i];


		this[setting[0]] = setting[1];
	}

	this.alive = true;
}
Movable.prototype = {
	update: function()
	{
		if (this.alive)
		{
			this.move();
			this.draw();
		}
	},

	draw: function()
	{

		context.fillStyle = this.color;

		context.fillRect(this.x, this.y, this.width, this.height);
	}
};
let Countable = function()
{
	this.x = 0;
	this.y = 0;

	this.speed = 2;

	this.value = 0;
	this.targetValue = 0;
}
Countable.prototype = {
	update: function()
	{
		this.move();
		this.draw();
	},

	change: function(amount)
	{
		this.targetValue += amount;
	},

	move: function()
	{
    if (this.value === this.targetValue)
			return;


		if (Math.abs(this.value - this.targetValue) < this.speed)
			this.value = this.targetValue;
		else if (this.targetValue > this.value)
			this.value += this.speed;
		else
			this.value -= this.speed;
	}
};


let Basket = function(data)
{
	Movable.call(this, data);
}
Basket.prototype = new Movable();
Basket.prototype.reset = function()
{
	// Reset the position
	this.x = canvas.width / 2 - this.width / 2;
	this.y = canvas.height - this.height;

	// Reset the color
	while (this.color == this.oldColor)
		this.color = RGBCatcher.colors[Math.round(rand(0, (RGBCatcher.colors.length-1)))];


	this.oldColor = this.color;
}
Basket.prototype.move = function()
{

	if (keyOn[37])
		this.x -= this.xSpeed - 1;


	if (keyOn[39])
		this.x += this.xSpeed - 1;


	if (this.x < 0)
		this.x = 0;


	if (this.x + this.width > canvas.width)
		this.x = canvas.width - this.width;
}


let Block = function(data)
{
	Movable.call(this, data);

	this.initPosition();
	this.initColor();
}
Block.prototype = new Movable();
Block.prototype.initPosition = function()
{

	if (this.x !== undefined || this.y !== undefined)
		return;

	this.x = Math.round(rand(0, canvas.width - this.width));

	this.y = 0 - this.height;
}
Block.prototype.initColor = function()
{
	if (this.color !== undefined)
		return;

	this.color = RGBCatcher.colors[Math.round(rand(0, (RGBCatcher.colors.length-1)))];
}
Block.prototype.move = function()
{

	this.y += this.ySpeed;
}


let Health = function()
{
	Countable.call(this);

	this.x = canvas.width - 82;
	this.y = 10;
}
Health.prototype = new Countable();
Health.prototype.reset = function()
{

	this.value = 1;
	this.targetValue = 100;
}
Health.prototype.draw = function()
{
	// The container
	// context.fillStyle = '#000';
	// context.strokeRect(this.x, this.y, 25 + 3, 15 + 2);

	// The bar
	if (this.value >= 50)
		context.fillStyle = '#00ff00';
	else if (this.value >= 25)
		context.fillStyle = '#fa6600';
	else if (this.value >= 0)
		context.fillStyle = '#ff0000';

	context.fillRect(this.x - 125, this.y + 10, this.value * (190/100), 35);

	// The text

	context.fillStyle = this.color;
	context.textBaseline = 'top';
  context.font="20px Arial";
	context.fillText('HP', this.x - 165, this.y + 15);
}


let Score = function()
{
	Countable.call(this);

	this.x = canvas.width - 172 - 10;
	this.y = 30 + 17 + 19;
}
Score.prototype = new Countable();

Score.prototype.reset = function()
{
	this.value = this.targetValue = 0;
}
Score.prototype.draw = function()
{
	context.textBaseline = 'top';
	context.fillStyle = this.color;
	context.fillText(this.value, this.x, this.y);
	context.fillText('PT', this.x - 65, this .y);
}



RGBCatcher = new function()
{
	this.colors = [
		'#1DD455', // green
		// '#05B834',
		'#165DB8', // blue
    '#B21110', // red
    '#EBEB2C' // yellow
	];

	let basketData = [
		['width', 60],
		['height', 17],
		['xSpeed', 9],
		['color', '#fff'],
		['oldColor', '#fff']
	];
	let blockData = [
		['width', 15],
		['height', 15],
		['ySpeed', 4],
		['color', undefined],
		['strength', 20]
	];

	let blocksPerLevel = 30;
	let blocksSpawnSec = 0.01;
	let blocksSpawned = 5;
	let blocksOnScreen = 0;
	let blocks = [];

	let level;
	let levelUp;

	let basket;
	let health;
	let score;
  let tally;

	let info;
	let infoScreenChange = true;

	let startTime;
	let frameTime;

	this.run = function()
	{

		canvas = document.getElementById('canvas');


		info = document.getElementById('info');


		context = canvas.getContext('2d');

		// Add an eventListener for the global keydown event
		document.addEventListener('keydown', function(event)
		{

			keyOn[event.keyCode] = true;
		}, false);


		document.addEventListener('keyup', function(event)
		{

			keyOn[event.keyCode] = false;
		}, false);


		basket = new Basket(basketData);
		health = new Health();
		score = new Score();


		interval = setInterval(titleScreen, 40/1000);
	}






  // Resets




	function resetGame()
	{
		basket.reset();
		health.reset();
		score.reset();

		blocksSpawnSec = .1;
		blocksSpawned = 0;
		blocksOnScreen = 0;
		blocks = [];

		level = 1;

		startTime = new Date().getTime();
	}

	function resetLevel()
	{
		basket.reset();
		health.reset();

		blocksSpawned = 0;
		blocksOnScreen = 0;
		blocks = [];
	}








  // Title Screen





	function titleScreen()
	{

		if (infoScreenChange)
		{

			info.innerHTML = '<p><span class="red">A</span><span class="green">Simple</span><span class="blue">Game</span><span class="red">Of</span><span class="green">Color</span><span class="blue">Fall</span></p><br/><p>Don\'t get crushed by the blocks! Collect points by catching blocks that match the color of your ship. Dodge the other blocks, they hurt you. <br/><br/>WATCH OUT: Blocks fall fast.  Move with the Left and Right arrows.  <br/><br/>Press SpaceBar to start</p>';





			infoScreenChange = false
		}


		if (keyOn[32])
		{

			infoScreenChange = true;


			info.style.display = 'none';


			clearInterval(interval);


			resetGame();


			interval = setInterval(gameLoop, 1000/80)
		}
	}




  // Game Over








	function gameOverScreen()
	{
		frameTime = new Date().getTime();


		if (infoScreenChange)
		{

			context.clearRect(0, 0, canvas.width, canvas.height);

    if (level < 4) {
      info.innerHTML = `<p id=game-over>A for effort! You made it to Level: ${level}!</p>`;
			info.style.display = 'block';
    }

    if (level > 3 && level < 7) {
      info.innerHTML = `<p id=game-over>Status: Confident and making Headway.  Level achieved: ${level}!</p>`;
			info.style.display = 'block';
    }

    if (level > 6 && level < 9) {
      info.innerHTML = `<p id=game-over>Status: Ultra-Prestiege. Congrats on making it to Level: ${level}!</p>`;
			info.style.display = 'block';
    }

    if (level > 8) {
      info.innerHTML = `<p id=game-over>You are the GOAT. Congrats on making it to Level: ${level}!</p>`;
			info.style.display = 'block';

    }




			infoScreenChange = false;
		}


		if (frameTime > startTime + (3*1000))
		{
			infoScreenChange = true;


			startTime = frameTime;


			clearInterval(interval);
			interval = setInterval(titleScreen, 30/1000);

		}
	}





// Game Loop







	function gameLoop()
	{
		frameTime = new Date().getTime();

		if (health.value < 1)
		{
			basket.alive = false;


			clearInterval(interval);
			interval = setInterval(gameOverScreen, 30/1000);

			return;
		}

		if (levelUp)
		{ //Upon hitting an info screeen or in the case of a levelUp clear cnavas and display text
			if (infoScreenChange)
			{
				context.clearRect(0, 0, canvas.width, canvas.height);

				info.innerHTML = `<p class="level-up">Level ${level-1} cleared!</p><br/><br/><p class="level-up">Get ready for level ${level}!</p>`;
				info.style.display = 'block';


				infoScreenChange = false;
			}

			if (frameTime >= startTime + (1.5*1000))
			{// Flashing of the message has been completed
				levelUp = false;
				// Hide the info screen and force an update next time
				info.style.display = 'none';
				infoScreenChange = true;
				// Set a new timer
				startTime = frameTime;
			}
			return;
		}

		context.clearRect(0, 0, canvas.width, canvas.height);

		basket.update();
		health.update();
		score.update();

		updateBlocks();

		if (frameTime >= startTime + (blocksSpawnSec*1000))
		{// If all blocks have been added
			if (addBlock() === false)
			{
				levelUp = true;
				level++;

        blocksPerLevel += 20
				blocksSpawnSec *= 0.799;
				blockData['ySpeed'] *= 7.81;

				basketData['xSpeed'] *= 1.82;
				resetLevel();
			}// The timer is finished, reset it
			startTime = frameTime;
		}
	}





// Update Blocks





	function updateBlocks()
	{
		for (let i = 0; i < blocks.length; i++)
		{

 			let block = blocks[i];

			block.update();
			checkCollision(block);
		}
	}





// Check Collisions







	function checkCollision(block)
	{
		if (block === undefined || block.alive === false)
			return;


		if (block.y + block.height < basket.y)
			return;

		if (block.x >= basket.x &&
		    block.x + block.width <= basket.x + basket.width)
		{
			if (block.alive == true)
			{
				block.alive = false;
				blocksOnScreen--;
			}
			if (block.color ===  basket.color)
				score.change(block.strength);
			else
				health.change(- (block.strength));
		}
		else
		{

			// if (block.color === basket.color && block.strength > 0)
			// {
			// 	health.change(- block.strength);
			// 	block.strength = 0;
			// }
			if (block.alive === true && block.y > canvas.height)
			{
				block.alive = false;
				blocksOnScreen--;
			}
		}

	}



  // Adding Blocks






	function addBlock()
	{ // Will add block if the total number pawned isn't equal to currnet amount spawned
		if (blocksSpawned != blocksPerLevel * level)
		{
			blocks[blocks.length] = new Block(blockData);
			blocksSpawned++;
			blocksOnScreen++;
		}
		else
		{
			if (blocksOnScreen == 0)
				return false;
		}
		return true;
	}
}

window.onload = function()
{
	RGBCatcher.run();
}
