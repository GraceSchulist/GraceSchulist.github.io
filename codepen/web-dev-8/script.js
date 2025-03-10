function rnd(n, p = 2) { return +n.toFixed(p) }

addEventListener('mousemove', e => {
	let _t = e.target;
	
	if(_t.classList.contains('blob')) {
		let r = _t.getBoundingClientRect(), 
				_g = _t.querySelector('radialGradient'), 
				dx = (e.clientX - r.x)/r.width - .5, 
				dy = (e.clientY - r.y)/r.height - .5, 
				m = Math.min(.49, Math.hypot(dy, dx)), 
				a = Math.atan2(dy, dx);
		
		_g.setAttribute('fx', rnd(.5 + m*Math.cos(a)));
		_g.setAttribute('fy', rnd(.5 + m*Math.sin(a)));
	}
})