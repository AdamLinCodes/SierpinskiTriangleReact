import React from 'react';
import '../index.css';

const X = 0, Y = 1; 

class Triangle extends React.Component {

  // checks if a point is within the area of the triangle
  pointIsValid(xPos, yPos) {
    const slopeFR = (this.props.topPoint[Y] - this.props.rightPoint[Y]) / (this.props.topPoint[X] - this.props.rightPoint[X]);
    const slopeFL = (this.props.topPoint[Y] - this.props.leftPoint[Y]) / (this.props.topPoint[X] - this.props.leftPoint[X]);

    const verticalTranslation = this.props.rightPoint[Y] - slopeFR * this.props.rightPoint[X];

    const fr = slopeFR * xPos + verticalTranslation; //function of the right side of the triangle
    const fl = slopeFL * xPos;        //function of the left side of the triangle

    if(xPos >= 50) { //check which side of the triangle the point is on
      return yPos < fr;
    } else {
      return yPos < fl;
    }
  }

  // generates the a random point within the area of the triangle
  calculateFirstPoint() {
    let xPos;
    let yPos;
    do {
      xPos = Math.floor(Math.random() * (this.props.rightPoint[X] - this.props.leftPoint[X])) + this.props.leftPoint[X];
      yPos = Math.floor(Math.random() * (this.props.rightPoint[Y] - this.props.leftPoint[Y])) + this.props.leftPoint[Y];
    } while (!this.pointIsValid(xPos, yPos));

    return [xPos, yPos];
  }

  // calculates the next point to plot, ie the mid point between a randomly
  // chosen corner point, and the previous plotted point
  calculateNextPoint(point) {
    let xPos = point[X];
    let yPos = point[Y];

    // picks one of the three corners at random
    let trianglePoint = Math.floor(Math.random() * 3) + 1;

    // returns the midpoint between 'point' and the randomly chosen corner point
    switch(trianglePoint) {
      case 1: // top corner @(50, 66)
        return [(this.props.topPoint[X]+xPos)/2, (this.props.topPoint[Y]+yPos)/2];

      case 2: // right bottom corner @(75, 33)
        return [(this.props.rightPoint[X]+xPos)/2, (this.props.rightPoint[Y]+yPos)/2];

      default: // left bottom @(25, 33)
        return [(this.props.leftPoint[X]+xPos)/2, ((this.props.leftPoint[Y]+yPos)/2)];
    }
  }

  // generates the html of all the dots, which will be rendered in the render()
  generateDots(quantity) {  
    var dots = [];

    //the three corners of the triangle
    const topStyle = {left: this.props.topPoint[X]+"vh", bottom: this.props.topPoint[Y]+"vh"};
    const leftStyle = {left: this.props.leftPoint[X]+"vh", bottom: this.props.leftPoint[Y]+"vh"};
    const rightStyle = {left: this.props.rightPoint[X]+"vh", bottom: this.props.rightPoint[Y]+"vh"};


    dots.push(<div id='top' style={topStyle}></div>);
    dots.push(<div id='right' style={rightStyle}></div>);
    dots.push(<div id='left' style={leftStyle}></div>);

    let point, xPos, yPos, setPoint;
    point = this.calculateFirstPoint();

    for (var i = 0; i < quantity; i++) {
      if(i > 0) {
        point = this.calculateNextPoint(point);
      }
      xPos = point[X].toFixed(2); // two decimal points for precision sake
      yPos = point[Y].toFixed(2);

      setPoint = { // sets the location of the point
        position: "absolute",
        left: xPos+"vh",
        bottom: yPos+"vh"
      }
      dots.push(<div className='dot' style={setPoint}></div>);
    }
    return dots;
  }

  render() {
    const quantity = this.props.quantity;
    return (
      <div id="triangleContainer">
        {
          this.generateDots(quantity).map(dot => 
            <div key={crypto.randomUUID()}>{dot}</div> // React requires that each element of a list has a unique key
          )
        }
      </div>
    );
  }
}

export default Triangle;