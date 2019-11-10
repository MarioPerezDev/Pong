//Defines vector class which will be used in the game
class Vector{
	constructor(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}
}

//Defines the Rectangle class that will be used to pring the players and the ball
class Rectangle{
	constructor(width, height){
		this.position = new Vector;
		this.size = new Vector(width, height);
	}

	get left(){
		return this.position.x - this.size.x/2;
	}
	get top(){
		return this.position.y - this.size.y/2;
	}
	get right(){
		return this.position.x + this.size.x/2;
	}
	get bottom(){
		return this.position.y + this.size.y/2;
	}
}

//Ball class, has velocity, position and "x y" size
class Ball extends Rectangle{
	constructor(){
		super(10,10);
		this.velocity = new Vector;
	}
}

//Class player, has "x y" size, position and score
class Player extends Rectangle{
	constructor(){
		super(20,90)
		this.score=0;
	}
}

class Pong {
	constructor(canvas){
		this._canvas = canvas;
		this._context = canvas.getContext("2d");

		this.ball = new Ball;
		this.ball.position.x=20;
		this.ball.position.y=200;

		this.ball.velocity.x = 100;
		this.ball.velocity.y = 0;

		this.players = [
			new Player,
			new Player, ];

			this.players[0].position.x=40;
			this.players[1].position.x=this._canvas.width -40;
			this.players.forEach(player => {
				player.position.y = this._canvas.height/2;
			})


		let lastTime;
		const callback = (millis) => {
			if(lastTime){
			this.update((millis - lastTime)/1000);
			}
			lastTime=millis;
			requestAnimationFrame(callback);
		}
		callback();
	}

	draw(){
		this._context.fillStyle = "#000"
		this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

		this.drawRectangle(this.ball);
		this.players.forEach(player => this.drawRectangle(player));
	}

	drawRectangle(rectangle){
		this._context.fillStyle = "#fff"
		this._context.fillRect(rectangle.left, rectangle.top, rectangle.size.x, rectangle.size.y);
	}

	checkHit(player,ball){
		if(player.right > ball.left &&
     		player.left < ball.right &&
     		player.bottom > ball.top &&
     		player.top < ball.bottom )
     	return true;
     	return false;
	}

	update(dt){
		this.ball.position.x += this.ball.velocity.x * dt;
		this.ball.position.y += this.ball.velocity.y * dt;

		if(this.ball.left < 0 || this.ball.right > this._canvas.width)
			this.ball.velocity.x = -this.ball.velocity.x;
		if(this.ball.top < 0 || this.ball.bottom > this._canvas.height)
			this.ball.velocity.y = -this.ball.velocity.y

		this.players.forEach(player => {
			if(this.checkHit(player,this.ball)){
			this.ball.velocity.x = -this.ball.velocity.x;
			this.ball.velocity.y = -this.ball.velocity.y;
			}
		})
		this.draw();
	}
}

const canvas = document.getElementById("pong");
const pong = new Pong(canvas);
