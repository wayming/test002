import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { addCircleAction, addRectAction } from './action.js';
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
    rects: state.rects
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCircle: () => {
      dispatch(addCircleAction());  
    },
    addRect: () => {
      dispatch(addRectAction());  
    }
  };
}

let conn = connect(mapStateToProps, mapDispatchToProps)(App);
export default conn;
