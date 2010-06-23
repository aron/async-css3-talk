(function () {
	var slides  = document.querySelectorAll('.slide'),
	    current = getHash() || 1,
	    scripts = [];

	Array.prototype.forEach.call(slides, function (slide, index) {
	  var script = slide.querySelector('pre.run'),
	      code = script ? script.innerText : null;

	  scripts.push(code);
	  if (index !== (current - 1)) {
		  updateSlide(slide, false);
	  }
	});

	function getHash() {
		return parseInt(location.hash.slice(1), 10) || null;
	}

	function setHash(number) {
	  document.body.id = 'slide-' + number;
		location.hash = '#' + number;
	}

	function updateSlide(slide, state) {
		var klass = ' hidden';
		if (state === true) {
			slide.className = slide.className.replace(klass, '');
		} else {
			slide.className = slide.className + klass;
		}
	}

	function toSlide(number) {
	  var index  = number - 1;
		if (slides[index] && number !== current) {
			updateSlide(slides[current - 1], false);
			updateSlide(slides[index], true);
			setHash(number);
			current = number;
		}
	}

	function nextSlide() {
		toSlide(current + 1);
	}

	function prevSlide() {
		toSlide(current - 1);
	}

	function runSlide() {
		var code = scripts[current - 1];
		if (code) {
			eval(code);
		}
	}

	window.addEventListener('keydown', function (event) {
		var key = event.keyCode;
		if ([32, 38, 39].indexOf(key) !== -1) {
			nextSlide();
		}
		else if (key === 37 || key === 40) {
			prevSlide();
		}
		else if (key === 13) {
		  runSlide();
		}
	}, false);

	window.addEventListener('hashchange', function () {
		toSlide(getHash());
	}, false);

	window.nextSlide = nextSlide;
	window.prevSlide = prevSlide;
	window.runSlide	 = runSlide;

	setHash(current);
})();

(function () {
	var js_highlighter  = new WebInspector.DOMSyntaxHighlighter("text/javascript"),
	    css_highlighter = new WebInspector.DOMSyntaxHighlighter("text/css"),
	    css_exp = /\bcss\b/,
	    js_exp  = /\bjs\b/;

	Array.prototype.forEach.call(document.querySelectorAll('code.highlight'), function (element) {
		if (js_exp.test(element.className)) {
			js_highlighter.syntaxHighlightNode(element);
		}
		else if (css_exp.test(element.className)) {
			css_highlighter.syntaxHighlightNode(element);
		}
	});
})();
