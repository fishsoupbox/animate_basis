function selectorAnime(element, option){
	var options = {
		duration: 500,
		easing: "easeIn",
		delay: 1000,
		to: 500
	}

	var elements = document.querySelectorAll('.close');
	var movements = [];
	var timing = new timingfunction();
	
	for (var i = 0; i < elements.length; i++) {
		movements.push(new Movement(elements[i], 500, Math.pow(2, i+1) * 2));
	}

	//V = V + at
	//S = Vt + 1/2at²
	
	//transition: el (duration) (timing-function (simple||bezier||step)) (delay)
	function Movement(el, duration, delay){
		this.el = el;
		this.delay = delay;
		this.duration = duration;
		this.translate = 0;
		this.to = 500;
		console.log(this.delay);
	}

	Movement.prototype.moveTo = function(shy){
		this.el.style.transform = "translateY(" + shy + "px)";
	}

	Movement.prototype.update = function(t, dt){
		var delay = this.delay;
		var duration = this.duration;
		var translate = this.translate;

		t -= delay;
		if(t >= 0){
			translate = this.to * timing.bounce(t / duration);

			this.translate = translate;

			this.moveTo(translate);
		}

		return t < duration;
	}

	function update(t, dt){
		var running = false;
		for (var i = 0; i < movements.length; i++) {
			running = movements[i].update(t, dt) || running;
			
			if(!running) {
				movements[i].moveTo(movements[i]['to']);
				movements.splice(i, 1);
			}
		}

		return movements.length;
	}

	requestAnimationFrame(function(t){
		var t0 = t, t1 = 0;
		requestAnimationFrame(function frames(t){
			update(t - t0, -t1 + (t1 = t)) && requestAnimationFrame(frames);
		})
	})
}

function timingfunction(){

	return {
		linear: function(p){
			return p;
		},
		easeInQuad: function(p){
			return p * p;
		},
		easeOutQuad: function(p){
			return 1 - (1 - p) * (1 - p);
		},
		easeInOutQuad: function(p){
			return 	p < 0.5 ?
					p * p * 2 :
					1 - (-2 * p + 2) * (-2 * p + 2) / 2;
		},
		easeInCubic: function(p){
			return p * p * p;
		},
		easeOutCubic: function(p){
			return 1 - (1 - p) * (1 - p) * (1 - p);
		},
		easeInOutCubic: function(p){
			return 	p < 0.5 ?
					p * p * p * 4 :
					1 - (-2 * p + 2) * (-2 * p + 2) * (-2 * p + 2) / 2;
		},
		easeInQuart: function(p){
			return p * p * p * p;
		},
		easeOutQuart: function(p){
			return 1 - (1 - p) * (1 - p) * (1 - p) * (1 - p);
		},
		easeInOutQuart: function(p){
			return 	p < 0.5 ?
					p * p * p * p * 8:
					1 - (-2 * p + 2) * (-2 * p + 2) * (-2 * p + 2) * (-2 * p + 2) / 2;
		},
		easeInQuint: function(p){
			return p * p * p * p* p;
		},
		easeOutQuint: function(p){
			return 1 - (1 - p) * (1 - p) * (1 - p) * (1 - p) * (1 - p);
		},
		easeInOutQuint: function(p){
			return 	p < 0.5 ?
					p * p * p * p * p * 16 :
					1 - (-2 * p + 2) * (-2 * p + 2) * (-2 * p + 2) * (-2 * p + 2) * (-2 * p + 2) / 2;
		},
		
		bounce: function(p) {
			if (p < (1/2.75)) {
				return (7.5625*p*p);
			} else if (p < (2/2.75)) {
				return (7.5625*(p-=(1.5/2.75))*p + 0.75);
			} else if (p < (2.5/2.75)) {
				return (7.5625*(p-=(2.25/2.75))*p + 0.9375);
			} else {
				return (7.5625*(p-=(2.625/2.75))*p + 0.984375);
			}
		},

		bouncePast: function(p) {
			if (p < (1/2.75)) {
				return (7.5625*p*p);
			} else if (p < (2/2.75)) {
				return 2 - (7.5625*(p-=(1.5/2.75))*p + 0.75);
			} else if (p < (2.5/2.75)) {
				return 2 - (7.5625*(p-=(2.25/2.75))*p + 0.9375);
			} else {
				return 2 - (7.5625*(p-=(2.625/2.75))*p + 0.984375);
			}
		},

		easeInOutBack: function(p) {
			var s = 1.70158;
			if((p/=0.5) < 1) return 0.5*(p*p*(((s*=(1.525))+1)*p -s));
			return 0.5*((p-=2)*p*(((s*=(1.525))+1)*p +s) +2);
		}
	}
}