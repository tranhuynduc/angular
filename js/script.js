var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Canvas = /** @class */ (function () {
    function Canvas(c) {
        if (c === void 0) { c = 'myCanvas'; }
        this.color = '#ff0000';
        this.canvas = document.getElementById(c);
        this.ctx = this.canvas.getContext("2d");
    }
    Canvas.prototype.draw = function (shape) {
        var w = shape.getWidth();
        var h = shape.getHeight();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        switch (shape.getType()) {
            case 'Circle':
                var c = shape;
                this.ctx.arc(c.getRadius(), c.getRadius(), c.getRadius(), 0, Math.PI * 2, true);
                break;
            case 'Square':
            case 'Rectangle':
                var r = shape;
                this.ctx.fillRect(0, 0, w, h);
                break;
            case 'Triangle':
                var t = shape;
                this.ctx.moveTo(w / 2, 0);
                this.ctx.lineTo(w, h);
                this.ctx.lineTo(0, h);
                this.ctx.lineTo(w / 2, 0);
                break;
            default:
                break;
        }
        this.ctx.stroke();
    };
    Canvas.prototype.setColor = function (c) {
        this.color = c;
    };
    return Canvas;
}());
var Shape = /** @class */ (function () {
    function Shape() {
        this.type = 'shape';
        this.color = "#ff0000";
    }
    Shape.prototype.setCanvas = function (canvas) {
        if (canvas === void 0) { canvas = 'myCanvas'; }
    };
    Shape.prototype.getType = function () {
        return this.type;
    };
    Shape.prototype.getArea = function () {
        return this.area;
    };
    Shape.prototype.getWidth = function () {
        return this.width;
    };
    Shape.prototype.getHeight = function () {
        return this.height;
    };
    return Shape;
}());
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(w, h) {
        var _this = _super.call(this) || this;
        _this.width = w;
        _this.height = h;
        _this.type = 'Rectangle';
        return _this;
    }
    Rectangle.prototype.getArea = function () {
        return this.area = this.width * this.height;
    };
    return Rectangle;
}(Shape));
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(w) {
        var _this = _super.call(this) || this;
        _this.width = w;
        _this.height = w;
        _this.type = 'Square';
        return _this;
    }
    return Square;
}(Rectangle));
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(r) {
        var _this = _super.call(this) || this;
        _this.PI = 3.14;
        _this.radius = r;
        _this.type = 'Circle';
        return _this;
    }
    Circle.prototype.getArea = function () {
        return this.area = this.radius * this.radius * this.PI;
    };
    Circle.prototype.getRadius = function () {
        return this.radius;
    };
    return Circle;
}(Shape));
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle(w, h) {
        var _this = _super.call(this) || this;
        _this.width = w;
        _this.height = h;
        _this.type = 'Triangle';
        return _this;
    }
    Triangle.prototype.getArea = function () {
        return this.area = this.width * this.height / 2;
    };
    return Triangle;
}(Shape));
var getAreaBtn = document.getElementById('get-area');
// var resultField = <HTMLInputElement>document.getElementById('result');
var tabContent = document.getElementById('pills-tabContent');
var messageField = document.getElementById('message');
getAreaBtn.addEventListener('click', function () {
    var activeTab = tabContent.querySelector('.active');
    var type = activeTab.dataset.type;
    var inputs = activeTab.querySelectorAll('input');
    var firstValue = parseFloat(inputs[0].value);
    var secondValue = inputs[1] ? parseFloat(inputs[1].value) : NaN;
    var result = 0;
    var shape;
    var message = '';
    // resultField.value = '';
    if (isNaN(firstValue)) {
        message = 'Please input value';
    }
    else if (firstValue < 0 || secondValue < 0) {
        message = 'the value cannot be negative';
    }
    else if ((type === 'triangle' || type === 'rectangle') && isNaN(secondValue)) {
        message = 'Please input second value';
    }
    if (message !== '') {
        messageField.className = 'text-danger';
        messageField.innerHTML = message;
        return true;
    }
    switch (type) {
        case 'square':
            shape = new Square(firstValue);
            break;
        case 'circle':
            shape = new Circle(firstValue);
            break;
        case 'rectangle':
            shape = new Rectangle(firstValue, secondValue);
            break;
        case 'triangle':
            shape = new Triangle(firstValue, secondValue);
            break;
        default:
            break;
    }
    result = shape.getArea();
    // resultField.value = result.toString();
    messageField.className = 'text-success';
    messageField.innerHTML = 'Yay!! Get the area successfully. \nThe area of ' + type + ' is: ' + result.toString();
    var canvas = new Canvas();
    canvas.draw(shape);
});
