function Watch(watchId) {
	this.watchId = watchId; 
	
	// Watch Canvas colors
	this.hourHandColor     	= '#000000';
	this.minuteHandColor   	= '#000000';
	this.minuteLineColor    = '#000000';
	this.secondHandColor   	= '#FF0000';
	// Watch line/radius/circle size
	this.radius  			= 0;
	this.minuteBigLine		= 0.07;
	this.minuteSmallLine	= 0.026;	
	this.secondsLineWidth	= 0.026;
	this.secondsCircleRadius= 0.1;
};

Watch.prototype.draw = function() {
	var watchCanvas = document.getElementById(this.watchId);
	if (watchCanvas) {
		/*	A 2d object "context" of the canvas for 
		*	designing and animating the watch.
		*/
		var context = watchCanvas.getContext('2d');
		if (context) {
			this.radius = 0.75 * (Math.min(watchCanvas.width, watchCanvas.height) / 2);

			// clear canvas and set new origin
			context.clearRect(0, 0, watchCanvas.width, watchCanvas.height);
			context.save();
			
			/*	Moving the canvas to its origin x horizontally and y vertically.	*/
			context.translate(watchCanvas.width / 2, watchCanvas.height / 2);

			// draw dial
			for (var i = 0; i < 60; i++) {
				context.save();
				
				/*	Adding a rotation to the object clockwise angle in radians	*/
				context.rotate(i * Math.PI / 30);
				if ((i % 5) == 0) {
					this.strokeLine(context, this.minuteLineColor, 0.0, -1.0, 0.0, -0.75, this.minuteBigLine);
				} else {
					this.strokeLine(context, this.minuteLineColor, 0.0, -1.0, 0.0, -0.92, this.minuteSmallLine);
				}
				
				/*	Restoring the watch drawing style state to the last state	*/
				context.restore();
			}

			// get current time
			var time    = new Date();
			var millis  = time.getMilliseconds() / 1000.0;
			var seconds = time.getSeconds();
			var minutes = time.getMinutes();
			var hours   = time.getHours();

			// draw hour line
			context.save();
			
			/*	Adding a rotation to the object clockwise angle in radians	*/
			context.rotate(hours * Math.PI / 6 + minutes * Math.PI / 360);
			
			this.fillPolygon(context, this.hourHandColor, -0.05, -0.6, 0.05, -0.6, 0.065, 0.26, -0.065, 0.26);
			context.restore();

			// draw minute line
			context.save();
			context.rotate(minutes * Math.PI / 30);
			
			this.fillPolygon(context, this.minuteHandColor, -0.035, -0.93, 0.035, -0.93, 0.05, 0.25, -0.05, 0.25);
			context.restore();

			// draw seconds line
			context.save();
			context.rotate(Math.min((seconds + millis) * (60.0 / 58.5), 60.0) * Math.PI / 30);
			
			this.strokeLine(context, this.secondHandColor, 0.0, -0.6, 0.0, 0.35, this.secondsLineWidth);
			this.fillCircle(context, this.secondHandColor, 0, -0.64, this.secondsCircleRadius);
			
			context.restore();
			context.restore();
		}
	}
};

Watch.prototype.fillCircle = function(context, color, x, y, radius) {
	if (color) {
		/*	Create a new path	*/
		context.beginPath();
		
		/*	Fill red color inside the circle	*/
		context.fillStyle = color;
		
		/*	Adding an arc to the path which is centered
		*	at (x, y) position with radius starting 
		*	at startAngle and ending at endAngle
		*/
		context.arc(x * this.radius, y * this.radius, radius * this.radius, 0, 2 * Math.PI, true);
		
		/*	Filling the red circle with the current fill style.	*/
		context.fill();
	}
};

Watch.prototype.strokeLine = function(context, color, x1, y1, x2, y2, width) {
	if (color) {
		/*	Create a new path	*/
		context.beginPath();
		
		/*	To set the color of the line using the strokeStyle property		*/
		context.strokeStyle = color;
		
		/*	Moving the starting point of a new sub-path to the (x, y) coordinates
		*/
		context.moveTo(x1 * this.radius, y1 * this.radius);
		
		/*	Connecting the last point in the subpath to the x, y coordinates with a straight line
		*/
		context.lineTo(x2 * this.radius, y2 * this.radius);
		context.lineWidth = width * this.radius;
		context.stroke();
	}
};

Watch.prototype.fillPolygon = function(context, color, x1, y1, x2, y2, x3, y3, x4, y4, x5, y5) {
	if (color) {
		/*	Create a new path	*/
		context.beginPath();
		
		/*	Fill black color inside the Hour and Minute Line	*/
		context.fillStyle = color;
		context.moveTo(x1 * this.radius, y1 * this.radius);
		context.lineTo(x1 * this.radius, y1 * this.radius);
		context.lineTo(x2 * this.radius, y2 * this.radius);
		context.lineTo(x3 * this.radius, y3 * this.radius);
		context.lineTo(x4 * this.radius, y4 * this.radius);
		if ((x5 != undefined) && (y5 != undefined)) {
			context.lineTo(x5 * this.radius, y5 * this.radius);
		}		
		
		/*	Filling the Hour and Minute Line with the current fill style.	*/
		context.fill();
	}
};

