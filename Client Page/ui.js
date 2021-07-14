const _C = document.querySelector('.container'), 
      N = _C.children.length;

_C.style.setProperty('--n', N);

let x0 = null;

function lock(e) {
    x0 = unify(e).clientX;
    locked = true
  };

let w;

function size() { w = window.innerWidth };

let i = 0;

let ini, fin;

const NF = 30;

let rID = null;

const TFN = {
    'linear': function(k) { return k }, 
    'ease-in': function(k, e = 1.675) {
      return Math.pow(k, e)
    }, 
    'ease-out': function(k, e = 1.675) {
      return 1 - Math.pow(1 - k, e)
    }, 
    'ease-in-out': function(k) {
      return .5*(Math.sin((k - .5)*Math.PI) + 1)
    }
  };

function stopAni() {
  cancelAnimationFrame(rID);
  rID = null
};

function ani(cf = 0) {
    _C.style.setProperty('--i', ini + (fin - ini)*TFN['ease-out'](cf/anf));
      
    if(cf === anf) { {
    stopAni();
    return
  }
	
  rID = requestAnimationFrame(ani.bind(this, ++cf))
};

function move(e) {
    if(locked) {
      let dx = unify(e).clientX - x0, 
        s = Math.sign(dx), 
        f = +(s*dx/w).toFixed(2);
		
    ini = i - s*f;

    if((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > .2) {
      i -= s;
      f = 1 - f
    }

    anf = Math.round(f*NF);
    ani();
    x0 = null;
    locked = false;
  }
};
  
  size();
  
  addEventListener('resize', size, false);

_C.addEventListener('mousedown', lock, false);
_C.addEventListener('touchstart', lock, false);

_C.addEventListener('mouseup', move, false);
_C.addEventListener('touchend', move, false);

function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

_C.addEventListener('touchmove', e => {e.preventDefault()}, false);

function drag(e) {
    e.preventDefault();
      
    if(locked) {
      let dx = unify(e).clientX - x0, 
        f = +(dx/w).toFixed(2);
          
      _C.style.setProperty('--i', i - f)
    }
  };

_C.addEventListener('mousemove', drag, false);
_C.addEventListener('touchmove', drag, false);