
class Canvas {
  protected canvas;
  protected ctx;
  protected color = '#ff0000';
  constructor(c:string = 'myCanvas') {
    this.canvas = <HTMLCanvasElement>document.getElementById(c);
    this.ctx = this.canvas.getContext("2d");
  }

  public draw(shape:Shape) {

    var w = shape.getWidth();
    var h = shape.getHeight();
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    switch (shape.getType()) {
      case 'Circle':
        let c:Circle = <Circle>shape;
        this.ctx.arc(c.getRadius(), c.getRadius(), c.getRadius(), 0, Math.PI * 2, true);
        break;
      case 'Square':
      case 'Rectangle':
        var r:Rectangle = <Rectangle>shape;
        this.ctx.fillRect(0,0,w, h);
        break;
      case 'Triangle':
        let t:Triangle = <Triangle>shape;
        this.ctx.moveTo(w/2, 0);
        this.ctx.lineTo(w, h);
        this.ctx.lineTo(0, h);
        this.ctx.lineTo(w/2, 0);
        break;
      default:
        break;
    }
    this.ctx.stroke();
  }

  public setColor (c:string) {
    this.color = c;
  }

}

class Shape {
  protected area:number;
  protected width:number;
  protected height:number;
  protected type:string = 'shape';

  public color = "#ff0000";

  public setCanvas (canvas:string = 'myCanvas') {

  }

  public getType() {
    return this.type;
  }
  public getArea() {
    return this.area;
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }
}

class Rectangle extends Shape {
  constructor(w?:number, h?:number) {
    super();

    this.width = w;
    this.height = h;
    this.type = 'Rectangle';

  }
  public getArea() {
    return this.area = this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(w?:number) {
    super();
    this.width = w;
    this.height = w;
    this.type = 'Square';
    
  }
}

class Circle extends Shape {
  protected radius:number;
  private PI: number = 3.14;
  constructor(r:number) {
    super();
    this.radius = r;
    this.type = 'Circle';
    
  }

  public getArea() {
    return this.area = this.radius * this.radius * this.PI;
  }

  public getRadius() {
    return this.radius;
  }
}

class Triangle extends Shape {
  constructor(w?:number, h?:number) {
    super();
    this.width = w;
    this.height = h;
    this.type = 'Triangle';
  }
  public getArea() {
    return this.area = this.width * this.height / 2;
  }
}

var getAreaBtn = document.getElementById('get-area');
// var resultField = <HTMLInputElement>document.getElementById('result');
var tabContent = document.getElementById('pills-tabContent');
var messageField = document.getElementById('message');

getAreaBtn.addEventListener('click', function() {
  var activeTab:HTMLInputElement = tabContent.querySelector('.active');
  var type = activeTab.dataset.type;
  var inputs = activeTab.querySelectorAll('input');
  var firstValue = parseFloat(inputs[0].value);
  var secondValue = inputs[1] ? parseFloat(inputs[1].value) : NaN;
  var result = 0;
  var shape;
  var message = '';
  // resultField.value = '';

  if (isNaN(firstValue))  {
    message = 'Please input value';
  } else if (firstValue < 0 || secondValue < 0) {
    message = 'the value cannot be negative';
  } else if ((type === 'triangle' || type === 'rectangle') && isNaN(secondValue)) {
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
  
  messageField.innerHTML = 'Yay!! Get the area successfully. \nThe area of ' + type + ' is: '+ result.toString();
  
  var canvas = new Canvas();
  canvas.draw(shape);
});