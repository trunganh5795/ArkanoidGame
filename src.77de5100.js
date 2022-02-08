// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"images/ball.png":[function(require,module,exports) {
module.exports = "./ball.96931fde.png";
},{}],"images/paddle.png":[function(require,module,exports) {
module.exports = "./paddle.f48d929a.png";
},{}],"images/brick-red.png":[function(require,module,exports) {
module.exports = "./brick-red.c1be1822.png";
},{}],"images/brick-blue.png":[function(require,module,exports) {
module.exports = "./brick-blue.695b92f9.png";
},{}],"images/brick-green.png":[function(require,module,exports) {
module.exports = "./brick-green.e573ebf2.png";
},{}],"images/brick-yellow.png":[function(require,module,exports) {
module.exports = "./brick-yellow.eff6b86b.png";
},{}],"images/brick-purple.png":[function(require,module,exports) {
module.exports = "./brick-purple.088683b7.png";
},{}],"setup.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STAGE_ROWS = exports.STAGE_PADDING = exports.STAGE_COLS = exports.PADDLE_WIDTH = exports.PADDLE_STARTX = exports.PADDLE_SPEED = exports.PADDLE_HEIGHT = exports.LEVEL = exports.BRICK_WIDTH = exports.BRICK_PADDING = exports.BRICK_IMAGES = exports.BRICK_HEIGHT = exports.BRICK_ENERGY = exports.BALL_STARTY = exports.BALL_STARTX = exports.BALL_SPEED = exports.BALL_SIZE = void 0;

var _brickRed = _interopRequireDefault(require("./images/brick-red.png"));

var _brickBlue = _interopRequireDefault(require("./images/brick-blue.png"));

var _brickGreen = _interopRequireDefault(require("./images/brick-green.png"));

var _brickYellow = _interopRequireDefault(require("./images/brick-yellow.png"));

var _brickPurple = _interopRequireDefault(require("./images/brick-purple.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Grab the canvas element for calculating the brick width
// depending on canvas width
var canvas = document.querySelector('#playField'); // Constants

var STAGE_PADDING = 10;
exports.STAGE_PADDING = STAGE_PADDING;
var STAGE_ROWS = 20;
exports.STAGE_ROWS = STAGE_ROWS;
var STAGE_COLS = 10;
exports.STAGE_COLS = STAGE_COLS;
var BRICK_PADDING = 5;
exports.BRICK_PADDING = BRICK_PADDING;
var BRICK_WIDTH = canvas ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING : 100;
exports.BRICK_WIDTH = BRICK_WIDTH;
var BRICK_HEIGHT = canvas ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING : 30;
exports.BRICK_HEIGHT = BRICK_HEIGHT;
var PADDLE_WIDTH = 150;
exports.PADDLE_WIDTH = PADDLE_WIDTH;
var PADDLE_HEIGHT = 25;
exports.PADDLE_HEIGHT = PADDLE_HEIGHT;
var PADDLE_STARTX = 450;
exports.PADDLE_STARTX = PADDLE_STARTX;
var PADDLE_SPEED = 10; ////

exports.PADDLE_SPEED = PADDLE_SPEED;
var BALL_SPEED = 5;
exports.BALL_SPEED = BALL_SPEED;
var BALL_SIZE = 20;
exports.BALL_SIZE = BALL_SIZE;
var BALL_STARTX = 500;
exports.BALL_STARTX = BALL_STARTX;
var BALL_STARTY = 400;
exports.BALL_STARTY = BALL_STARTY;
var BRICK_IMAGES = {
  1: _brickRed.default,
  2: _brickGreen.default,
  3: _brickYellow.default,
  4: _brickBlue.default,
  5: _brickPurple.default
};
exports.BRICK_IMAGES = BRICK_IMAGES;
var BRICK_ENERGY = {
  1: 1,
  2: 1,
  3: 2,
  4: 2,
  5: 3 // Purple brick

};
exports.BRICK_ENERGY = BRICK_ENERGY;
var LEVEL = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 3, 0, 0, 3, 2, 0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 4, 3, 3, 4, 2, 0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 0, 3, 5, 5, 3, 0, 0, 0, 0, 0, 2, 4, 3, 3, 4, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 2, 3, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 5, 5, 0, 0, 5, 5, 0, 0]];
exports.LEVEL = LEVEL;
},{"./images/brick-red.png":"images/brick-red.png","./images/brick-blue.png":"images/brick-blue.png","./images/brick-green.png":"images/brick-green.png","./images/brick-yellow.png":"images/brick-yellow.png","./images/brick-purple.png":"images/brick-purple.png"}],"sprites/Paddle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paddle = void 0;

var Paddle =
/** @class */
function () {
  function Paddle(speed, PADDLE_IMG, pos, size) {
    var _this = this;

    this.img = new Image();
    this.speed = speed;
    this.img.src = PADDLE_IMG;
    this.pos = pos;
    this.size = size;
    this.moveLeft = false;
    this.moveRight = false;
    document.addEventListener("keydown", function (e) {
      if (e.code === "ArrowLeft") {
        _this.moveLeft = true;
      } else if (e.code === "ArrowRight") {
        _this.moveRight = true;
      }
    });
    document.addEventListener("keyup", function (e) {
      _this.moveLeft = _this.moveRight = false;
    });
  }

  Paddle.prototype.setSpeed = function (speed) {
    this.speed = speed;
  };

  Paddle.prototype.makeMove = function (speed) {
    this.pos.x += speed.x;
  };

  Object.defineProperty(Paddle.prototype, "getSize", {
    get: function get() {
      return this.size;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "getSpeed", {
    get: function get() {
      return this.speed;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "getPos", {
    get: function get() {
      return this.pos;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "getImg", {
    get: function get() {
      return this.img;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "getMoveLeft", {
    get: function get() {
      return this.moveLeft;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "getMoveRight", {
    get: function get() {
      return this.moveRight;
    },
    enumerable: false,
    configurable: true
  });
  return Paddle;
}();

exports.Paddle = Paddle;
},{}],"view/CanvasView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasView = void 0;

var _setup = require("~/setup");

var CanvasView =
/** @class */
function () {
  function CanvasView() {
    var _a;

    this.canvas = document.getElementById("playField");
    this.context = (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.getContext("2d");
    this.score = 0;
    this.level = 1;
    this.scoreDisplay = document.getElementById("score");
    this.displayInfo = document.getElementById("info");
  }

  CanvasView.prototype.clearCanvas = function () {
    var _a, _b, _c;

    (_a = this.context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, (_b = this.canvas) === null || _b === void 0 ? void 0 : _b.width, (_c = this.canvas) === null || _c === void 0 ? void 0 : _c.height);
  };

  CanvasView.prototype.drawStuff = function (stuff) {
    var _a;

    if (stuff) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.drawImage(stuff.getImg, stuff.getPos.x, stuff.getPos.y, stuff.getSize.width, stuff.getSize.height);
    }
  };

  CanvasView.prototype.checkLoose = function (ball) {
    if (ball.getPos.y >= this.canvas.height) {
      if (this.displayInfo) {
        this.displayInfo.innerHTML = "You Loose";
        return true;
      }
    }

    return false;
  };

  CanvasView.prototype.checkWin = function (bricks) {
    if (bricks.length === 0) {
      if (this.displayInfo) {
        this.displayInfo.innerHTML = "You Win";

        if (this.level < _setup.LEVEL.length) {
          this.setLevel();
        }
      }

      return true;
    }

    return false;
  };

  CanvasView.prototype.drawBrick = function (brickList) {
    var _this = this;

    brickList.forEach(function (item, index) {
      _this.drawStuff(item);
    });
  };

  CanvasView.prototype.setScore = function () {
    this.score += 1;

    if (this.scoreDisplay) {
      this.scoreDisplay.innerHTML = this.score.toString();
    }
  };

  CanvasView.prototype.setLevel = function () {
    this.level += 1;
  };

  Object.defineProperty(CanvasView.prototype, "getCanvas", {
    get: function get() {
      return this.canvas;
    },
    enumerable: false,
    configurable: true
  });
  return CanvasView;
}();

exports.CanvasView = CanvasView;
},{"~/setup":"setup.ts"}],"sprites/Ball.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = void 0;

var Ball =
/** @class */
function () {
  function Ball(speed, BALL_IMG, pos, size) {
    this.img = new Image();
    this.speed = speed;
    this.img.src = BALL_IMG;
    this.pos = pos;
    this.size = size;
  }

  Ball.prototype.makeMove = function () {
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  };

  Ball.prototype.setSpeed = function (speed) {
    this.speed = speed;
  };

  Ball.prototype.setPos = function (pos) {
    this.pos = pos;
  };

  Object.defineProperty(Ball.prototype, "getSpeed", {
    get: function get() {
      return this.speed;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "getPos", {
    get: function get() {
      return this.pos;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "getSize", {
    get: function get() {
      return this.size;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "getImg", {
    get: function get() {
      return this.img;
    },
    enumerable: false,
    configurable: true
  });
  return Ball;
}();

exports.Ball = Ball;
},{}],"sprites/Brick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Brick = void 0;

var Brick =
/** @class */
function () {
  function Brick(BRICK_IMG, pos, size, level) {
    this.img = new Image();
    this.img.src = BRICK_IMG;
    this.pos = pos;
    this.size = size;
    this.level = level;
  }

  Brick.prototype.setLevel = function () {
    this.level -= 1;
  };

  Brick.prototype.setImage = function (path) {
    this.img.src = path;
  };

  Object.defineProperty(Brick.prototype, "getSize", {
    get: function get() {
      return this.size;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "getLevel", {
    get: function get() {
      return this.level;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "getPos", {
    get: function get() {
      return this.pos;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "getImg", {
    get: function get() {
      return this.img;
    },
    enumerable: false,
    configurable: true
  });
  return Brick;
}();

exports.Brick = Brick;
},{}],"collisionChecker.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollisionChecker = void 0;

var _setup = require("./setup");

var CollisionChecker =
/** @class */
function () {
  function CollisionChecker(wallSize) {
    this.wallSize = wallSize;
  }

  CollisionChecker.prototype.collisionBallWithWall = function (ball, paddle, paddleHeight, paddleWidth) {
    if (ball.getPos.x + _setup.BALL_SIZE < this.wallSize.width && ball.getPos.x > 0 && ball.getPos.y > 0 && ball.getPos.y < this.wallSize.height) {
      this.collisionBallWithPaddle(ball, paddle, paddleHeight, paddleWidth);
      return false;
    } else {
      if (ball.getPos.x >= this.wallSize.width || ball.getPos.x <= 0) {
        ball.setSpeed({
          x: -ball.getSpeed.x,
          y: ball.getSpeed.y
        });
      }

      if (ball.getPos.y <= 0) {
        ball.setSpeed({
          x: ball.getSpeed.x,
          y: -ball.getSpeed.y
        });
      }

      return true;
    }
  };

  CollisionChecker.prototype.collisionBallWithPaddle = function (ball, paddle, paddleHeight, paddleWidth) {
    if (ball.getPos.y + _setup.BALL_SIZE === paddle.getPos.y && ball.getPos.x + _setup.BALL_SIZE >= paddle.getPos.x && ball.getPos.x <= paddle.getPos.x + paddleWidth) {
      ball.setSpeed({
        x: ball.getSpeed.x,
        y: -ball.getSpeed.y
      });
    } else if (ball.getPos.y + _setup.BALL_SIZE > paddle.getPos.y && ball.getPos.y + _setup.BALL_SIZE <= paddle.getPos.y + _setup.PADDLE_HEIGHT && ball.getPos.x + _setup.BALL_SIZE >= paddle.getPos.x && ball.getPos.x <= paddle.getPos.x + paddleWidth) {
      ball.setSpeed({
        x: -ball.getSpeed.x,
        y: -ball.getSpeed.y
      });
    }
  };

  CollisionChecker.prototype.collisionBallWithBrick = function (ball, brick) {
    if (ball.getPos.x + _setup.BALL_SIZE > brick.getPos.x + _setup.BALL_SPEED && ball.getPos.x < brick.getPos.x + _setup.BRICK_WIDTH - _setup.BALL_SPEED && ball.getPos.y + _setup.BALL_SIZE > brick.getPos.y && ball.getPos.y < brick.getPos.y + _setup.BRICK_HEIGHT) {
      //Change ball direction
      ball.setSpeed({
        x: ball.getSpeed.x,
        y: -ball.getSpeed.y
      });
      return true;
    } else if (ball.getPos.x + _setup.BALL_SIZE >= brick.getPos.x && ball.getPos.x <= brick.getPos.x + _setup.BRICK_WIDTH && ball.getPos.y + _setup.BALL_SIZE > brick.getPos.y && ball.getPos.y < brick.getPos.y + _setup.BRICK_HEIGHT) {
      //Change ball direction
      ball.setSpeed({
        x: -ball.getSpeed.x,
        y: -ball.getSpeed.y
      });
      return true;
    }

    return false;
  };

  CollisionChecker.prototype.collisionBallWithBrickList = function (ball, brick, context) {
    for (var i = 0; i < brick.length; i++) {
      if (this.collisionBallWithBrick(ball, brick[i])) {
        brick[i].setLevel();
        context.setScore();

        if (brick[i].getLevel === 0) {
          //remove brick with enrgy equal 0
          brick.splice(i, 1);
        } else {
          brick[i].setImage(_setup.BRICK_IMAGES[brick[i].getLevel]);
        }

        break;
      }
    }
  };

  CollisionChecker.prototype.collisitonPaddleWithWall = function (paddle, context) {
    if (paddle.getMoveRight) {
      if (paddle.getPos.x + _setup.PADDLE_WIDTH < context.getCanvas.width) {
        paddle.makeMove({
          x: _setup.PADDLE_SPEED,
          y: _setup.PADDLE_SPEED
        });
      }
    } else if (paddle.getMoveLeft) {
      if (paddle.getPos.x > 0) {
        paddle.makeMove({
          x: -_setup.PADDLE_SPEED,
          y: _setup.PADDLE_SPEED
        });
      }
    }
  };

  return CollisionChecker;
}();

exports.CollisionChecker = CollisionChecker;
},{"./setup":"setup.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var _ball = _interopRequireDefault(require("./images/ball.png"));

var _paddle = _interopRequireDefault(require("./images/paddle.png"));

var _setup = require("./setup");

var _Paddle = require("./sprites/Paddle");

var _CanvasView = require("./view/CanvasView");

var _Ball = require("./sprites/Ball");

var _Brick = require("./sprites/Brick");

var _collisionChecker = require("./collisionChecker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __spreadArray = void 0 && (void 0).__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}; // Start here


var btn = document.getElementById("start");
var info = document.getElementById("info");
var levelDisplay = document.getElementById("level");
var scoreDisplay = document.getElementById("score");
var button = document.getElementById("start");
var view = new _CanvasView.CanvasView();

var brickPos = function brickPos(index) {
  var x = index % _setup.STAGE_COLS * _setup.BRICK_WIDTH + (index + 1) % _setup.STAGE_COLS * _setup.BRICK_PADDING;

  var y = Math.floor(index / _setup.STAGE_COLS) * (_setup.BRICK_PADDING + _setup.BRICK_HEIGHT);

  return {
    x: x,
    y: y
  };
};

var createBricks = function createBricks(level) {
  var renderList = _setup.LEVEL[level - 1].reduce(function (brickList, item, index) {
    if (item === 0) return brickList;
    return __spreadArray(__spreadArray([], brickList, true), [new _Brick.Brick(_setup.BRICK_IMAGES[item], brickPos(index), {
      width: _setup.BRICK_WIDTH,
      height: _setup.BRICK_HEIGHT
    }, _setup.BRICK_ENERGY[item])], false);
  }, []);

  return renderList;
};

var gameRender = function gameRender(context, paddle, ball, brickList, collisonCheck, level) {
  context.clearCanvas();
  context.drawStuff(paddle);
  context.drawStuff(ball);
  context.drawBrick(brickList);
  var ballCheckCollision = collisonCheck.collisionBallWithWall(ball, paddle, _setup.PADDLE_HEIGHT, _setup.PADDLE_WIDTH);
  ball.makeMove();
  collisonCheck.collisitonPaddleWithWall(paddle, context);
  collisonCheck.collisionBallWithBrickList(ball, brickList, context);

  if (ballCheckCollision) {
    if (context.checkLoose(ball)) return;
  }

  if (context.checkWin(brickList)) {
    if (level < _setup.LEVEL.length) {
      level += 1;
      brickList = createBricks(level);
      ball.setPos({
        x: _setup.BALL_STARTX,
        y: _setup.BALL_STARTY
      });
      ball.setSpeed({
        x: _setup.BALL_SPEED,
        y: -_setup.BALL_SPEED
      });
      var levelDisplay_1 = document.getElementById("level");

      if (levelDisplay_1 && info) {
        levelDisplay_1.innerHTML = "Level ".concat(level, "/5");
        info.innerHTML = "Press Play";
      }
    } else {
      return;
    }
  }

  ;
  requestAnimationFrame(function () {
    gameRender(context, paddle, ball, brickList, collisonCheck, level);
  });
};

var gameStart = function gameStart(context) {
  if (btn && info && levelDisplay && scoreDisplay) {
    btn.innerHTML = "Play Again";
    info.innerHTML = "Press Play";
    levelDisplay.innerHTML = "Level 1/5";
    scoreDisplay.innerHTML = "0";
  }

  var paddle = new _Paddle.Paddle({
    x: _setup.PADDLE_SPEED,
    y: _setup.PADDLE_SPEED
  }, _paddle.default, {
    x: _setup.PADDLE_STARTX,
    y: context.getCanvas.height - _setup.PADDLE_HEIGHT
  }, {
    width: _setup.PADDLE_WIDTH,
    height: _setup.PADDLE_HEIGHT
  });
  var ball = new _Ball.Ball({
    x: _setup.BALL_SPEED,
    y: -_setup.BALL_SPEED
  }, _ball.default, {
    x: _setup.BALL_STARTX,
    y: _setup.BALL_STARTY
  }, {
    width: _setup.BALL_SIZE,
    height: _setup.BALL_SIZE
  });
  var brickList = createBricks(1);
  var collisonCheck = new _collisionChecker.CollisionChecker({
    width: context.getCanvas.width,
    height: context.getCanvas.height
  });
  gameRender(context, paddle, ball, brickList, collisonCheck, 1);
};

button.addEventListener("click", function () {
  gameStart(view);
});
},{"./images/ball.png":"images/ball.png","./images/paddle.png":"images/paddle.png","./setup":"setup.ts","./sprites/Paddle":"sprites/Paddle.ts","./view/CanvasView":"view/CanvasView.ts","./sprites/Ball":"sprites/Ball.ts","./sprites/Brick":"sprites/Brick.ts","./collisionChecker":"collisionChecker.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53433" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map