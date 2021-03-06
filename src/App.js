import React, {Component} from 'react';
import BubbleSort from './algorithms/BS';
import InsertionSort from './algorithms/IS';
import SelectionSort from './algorithms/SS';
import MergeSort from './algorithms/MS';
import Play from '@material-ui/icons/PlayCircleOutlineRounded';
import Forwards from '@material-ui/icons/SkipNextRounded';
import Backward from '@material-ui/icons/SkipPreviousRounded';
import RotateLeft from '@material-ui/icons/RotateLeft';
import Bar from './components/Bar.js';
import './App.css';

class App extends Component {
  state = {
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 20,
    delay: 100,
    algorithm: 'Bubble Sort',
    timeouts: [],
    value: 'Bubble Sort'
  };

  ALGORITHMS = {
    'Bubble Sort': BubbleSort,
    'Insertion Sort': InsertionSort,
    'Selection Sort': SelectionSort,
    'Merge Sort': MergeSort,
  }

componentDidMount() {
  this.generateRandomArray();
};

generateSteps = () => {
  let array = this.state.array.slice();
  let steps = this.state.arraySteps.slice();
  let colorSteps = this.state.colorSteps.slice();

  this.ALGORITHMS[this.state.algorithm](array, 0, this.state.count, steps, colorSteps);

  this.setState({
    arraySteps: steps,
    colorSteps: colorSteps
  })

}

handleChange = (event) => {
  this.setState({
    value: event.target.value,
    algorithm: event.target.value,
  });
  this.generateRandomArray();
}

handleSubmit = (event) => {
  alert("Your algorithm is: " + this.state.algorithm);
  event.preventDefault();
}

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({
      timeouts: []
    });
  };

  clearColorKey = () => {
    let blankKey = new Array(this.state.count).fill(0);
    
    this.setState({
      colorKey: blankKey,
      colorSteps: [blankKey],
    });
  }

  generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
  };

  generateRandomArray = () => {
    this.clearTimeouts();
    this.clearColorKey();
    const count = this.state.count;
    const temp = [];
    
    for (let i = 0; i < count; i++) {
      temp.push(this.generateRandomNumber(50,200));
    }

    this.setState({
      array: temp,
      arraySteps: [temp],
      currentStep: 0,
    }, () => {
      this.generateSteps();
    });
};

  changeArray = (index, value) => {
    let arr = this.state.array;
    arr[index] = value;
    this.setState({
      array: arr,
      arraySteps: [arr],
      currentStep: 0
    }, () => {
      this.generateSteps();
    });
  };

  previousStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === 0) return;
    currentStep -= 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep]
    })
  }

  nextStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep >= this.state.arraySteps.length - 1) return;
    currentStep += 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep]
    })
  }

  start = () => {
    let steps = this.state.arraySteps;
    let colorSteps = this.state.colorSteps;

    this.clearTimeouts();
    
    let timeouts = []; 
    let i = 0;

    while (i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          colorKey: colorSteps[currentStep],
          currentStep: currentStep + 1,
        });
        timeouts.push(timeout);
      }, this.state.delay * i);
      i++;
    }
    this.setState({
      timeouts: timeouts,
    });
  };

  render() {
    let bars = this.state.array.map((value, index) => (
    <Bar 
        key={index} 
        index={index} 
        length={value} 
        color={this.state.colorKey[index]}
        changeArray={this.changeArray}
      />
    ));

      let playButton;

      if (this.state.arraySteps.length === this.state.currentStep) {
        playButton = (
          <button className="controller" onClick={this.generateRandomArray}>
            <RotateLeft />
          </button>
        )
      }else {
        playButton = (
          <button className="controller" onClick={this.start}>
            <Play />
          </button>
        )
      }

    return (
    <div className='app'>
      <h1 className='App'>Sorting Algorithms</h1>
        <div className="button">
          <label>
            Pick your algorithm:
          <select value={this.state.value} onChange={this.handleChange}>
              <option value='Bubble Sort'>Bubble Sort</option>
              <option value='Heap Sort'>Heap Sort</option>
              <option value='Insertion Sort'>Insertion Sort</option>
              <option value='Merge Sort'>Merge Sort</option>
              <option value='Selection Sort'>Selection Sort</option>
            </select>
          </label>
        </div>
      <div className="frame">
        <div className="barsDiv container card">{bars}</div>
      </div>
      <div className="control-panel">
        <div className="control-buttons">
        <button className="controller" onClick={this.previousStep}>
          <Backward />
        </button>
          {playButton}
          <button className="controller" onClick={this.nextStep}>
            <Forwards />
          </button>
        </div>
      </div>
      <div className="panel"></div>
    </div>
    );
  }
}

export default App;
