function init(){
	canvas = document.getElementById("mycanvas") ;   //canvas is used to draw graphics
	W = canvas.height = 500 ; 
	H = canvas.width = 500 ;
	game_over=false;
	pen = canvas.getContext('2d');    //creating a context to draw objects on the canvas
	cs=54;

	score=5;

	//create a food image object

	food_img= new Image();
	food_img.src="apple.jpg";

	trophy = new Image();
	trophy.src="trophy.jpg";

	food=getRandomFood();

	snake = {   //creating a object that can oscillate
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",

		createSnake:function(){
			for(var i=this.init_len; i>0; i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){
			pen.fillStyle=this.color;
			for( var i=0;i<this.cells.length;i++){
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-1,cs-1);
			}
		},

		updateSnake:function(){

			console.log("updating snake according to the direction property")

			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			var nextX , nextY ;


			if(headX==food.x && headY==food.y)
			{
				console.log("food eaten");
				food = getRandomFood();
				score++; 
			}

			else
			{
				this.cells.pop();
			}

			if(this.direction == "right")
			{
				nextX=headX+1;
				nextY=headY;
			}
			else if(this.direction == "left")
			{
				nextX=headX-1;
				nextY=headY;
			}
			else if(this.direction == "down")
			{
				nextX=headX;
				nextY=headY+1;
			}
			else
			{
				nextX=headX;
				nextY=headY-1;
			}

			console.log(snake.direction);

			this.cells.unshift({ x : nextX , y : nextY }) ;



			//write a logic to check snake is put of the box or not

			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].y>last_y || this.cells[0].x>last_x){
				game_over = true ;
			}


		}
	};

	snake.createSnake();

	//Add a event listener to the document object
	function keypressed(e){

		if(e.key == "ArrowRight")
		{
			snake.direction = "right";
		}
		else if(e.key == "ArrowLeft")
		{
			snake.direction = "left";
		}
		else if(e.key == "ArrowDown")
		{
			snake.direction = "down";
		}
		else 
		{
			snake.direction = "up";
		}
		console.log(snake.direction);

	}


	document.addEventListener("keydown",keypressed);

}


function draw(){

	pen.clearRect(0,0,W,H);

	snake.drawSnake();

	pen.fillStyle = "red";

	pen.drawImage(food_img,food.x*cs,food.y*cs ,cs,cs);


	pen.drawImage(trophy,18,20,cs,cs);

	pen.fillStyle="blue";
	pen.font="20px Roboto";
	pen.fillText(score,50,50);
	

}


function update(){

	snake.updateSnake();
}


function getRandomFood(){

	var foodX = Math.round (Math.random()*(W-cs)/cs);
	var foodY = Math.round (Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",

	}
	return food;
	
}
	


function gameloop(){
	draw();
	update();

	if(game_over == true)
	{
		clearInterval(f);
		alert("Game over");
	}
}


init();
var f = setInterval(gameloop,100);




