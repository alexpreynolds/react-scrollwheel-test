import React from 'react';

import './App.css';

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('wheel', this.handleWheel, { passive: false });
  }
  
  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleWheel);
  }
  
  handleWheel = debounce((e) => {
    const newDelta = (e.shiftKey) ? 1000 * e.deltaY : e.deltaY;
    this.setState({
      scrollY: newDelta,
    });
  }, 0)

  render() {
    return (
      <>
        <h1 className="card-title">react-scrollwheel-test</h1>
        <div className="card">
          {this.state.scrollY}
        </div>
      </>
    )
  }
}

export default App
