import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { addCircleAction, addRectAction } from './action.js';
import { connect } from 'react-redux';

class App extends Component {

  generateSVG() {
    console.log(this.props.circles)
    return
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
            <circle cx="420.9" cy="296.5" r="45.7"/>
            <rect x="360" y="100" width="100" height="100"/>
            {
              this.props.circles.map(node => {
                <circle cx={node.cx} cy={node.cy}/>;                
              })
            }
            {
              this.props.rects.map(node => {
                <circle x={node.x} y={node.y}/>;                
              })              
            }
        </svg>;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <button onClick={() => this.props.addCircle()}>
        </button>
        <button onClick={() => this.props.addRect()}>
        </button>
  {this.generateSVG()}
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
