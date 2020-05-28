// PROJECT NAME: DOTTED LINES
// AUTHOR: Vasu Goel 
// Github Handle: @CrypticGuy
// License: MIT
// This project can be especially used for backgrounds for different websites
var canvas;

function setup()
{
	// alert("3");
	canvas=createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style('z-index','-1');
	background(40, 40, 100);
}

function draw()
{
	background(10, 10, 255);
	stroke(255);
	translate(width/2, height/2);
    	var a = atan2(mouseY-height/2, mouseX-width/2);
    	resetMatrix();
	
	for (var i = 10; i < width; i += 50)
	{
		for (var j = 10; j < height; j += 50)
		{
			var length = dist(i, j, width/2, height/2)*dist(width/2, height/2, mouseX, mouseY)/6000;
			line(i , j, i + cos(a) * length, j + sin(a) * length);
		}
	}
}

