import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';

import { addCircleAction, addRectAction, saveCoord } from './action.js';
import { connect } from 'react-redux';

class App extends Component {

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

  componentDidMount() {
    var workarea = d3.select("#workarea");
    workarea.on("mousedown", mousedown);
    workarea.on("mouseup", mouseup);

    function mousedown(d, i) {
      var coord = d3.mouse(this);
      console.log("[" + coord[0] + "," + coord[1] + "]");
      this.props.saveCoord(...coord);
    }

    function mouseup(d, i) {
      var coord = d3.mouse(this);
      var lastCoord = this.props.lastCoord;
      console.log("[" + coord[0] + "," + coord[1] + "]");
      this.props.addRectAction(lastCoord.x, lastCoord.y, abs(lastCoord.x - coord[0]), abs(lastCoord.y - coord[1])); 
    }
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
