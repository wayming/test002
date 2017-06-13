import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';

import { addCircleAction, addRectAction, saveCoord } from './action.js';
import { connect } from 'react-redux';

class App extends Component {

  constructor() {
    super();
  }

  generateSVG() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
            {
              this.props.circles.map(node => {
                return <circle key={node.cx} cx={node.cx} cy={node.cy} r={node.r} fill={node.fill}/>             
              })
            }
            {
              this.props.rects.map(node => {
                return <rect key={node.x} x={node.x} y={node.y} height={node.h} width={node.w} fill={node.fill}/>             
              })
            }
      </svg>
    )
  }

  mousedown(d, i) {
    var saveCoord = this.props.saveCoord;
    return function(d, i) {
      var coord = d3.mouse(this);
      console.log("[" + coord[0] + "," + coord[1] + "]");
      saveCoord(coord[0], coord[1]);
    }
  }

  mouseup(d, i) {
    var lastCoord = this.props.lastCoord;
    console.log(this.props.lastCoord.x);
    var addRect = this.props.addRect;
    return function(d, i) {
      var coord = d3.mouse(this);
      console.log(lastCoord);

      console.log("[" + lastCoord.x + "," + lastCoord.y + "]");
      console.log("[" + coord[0] + "," + coord[1] + "]");
      addRect(lastCoord.x, lastCoord.y, Math.abs(lastCoord.x - coord[0]), Math.abs(lastCoord.y - coord[1])); 
    }
  }

  componentDidMount() {
    var workarea = d3.select("#workarea");
    workarea.on("mousedown", this.mousedown());
    workarea.on("mouseup", this.mouseup());
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => this.props.addCircle()}>
        </button>
        <button onClick={() => this.props.addRect()}>
        </button>
        <div id="workarea" style={{overflow: "scroll"}}> 
          <div id="svgcanvas" style={{position: 'relative', width: '1000px', height: '600px'}}>
            {this.generateSVG()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    circles: state.circles,
    rects: state.rects,
    lastCoord: state.coord
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCircle: () => {
      dispatch(addCircleAction());  
    },
    addRect: () => {
      dispatch(addRectAction());  
    },
    saveCoord: (x, y) => {
      dispatch(saveCoord(x, y));
    }
  };
}

let conn = connect(mapStateToProps, mapDispatchToProps)(App);
export default conn;
