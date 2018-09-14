import React, { Component } from 'react';
import '../styles/Balloon.css'
import * as constant from '../constant/constant';

let stress_baloons=[];
class StressBuster extends Component {
  constructor(props){
    super(props);
    this.state={
      counter:0
    }
    this.add = this.add.bind(this);
    this.minus = this.minus.bind(this);
  }
  add() {
    this.setState((prevState) => {
        console.log('>>add One, counter=' + (prevState.counter + 1));
        return {
            counter: prevState.counter + 1
        };
    });
}

minus() {
    this.setState((prevState) => {
        console.log('>>minus One, counter=' + (prevState.counter - 1));
        return {
            counter: prevState.counter - 1
        };
    });
}
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('Hi,I am in getDerivedStateFromProps'+ ' --nextProps=' + nextProps.maxCount + ' --prevState=' + prevState.counter);

    if (prevState.counter > nextProps.maxCount) {
        return {
            counter: nextProps.maxCount
        };
    }
    return null;
  }
  
  componentDidMount() {
    console.log('Hi,I am in componentDidMount');
    
    const strCount = sessionStorage.getItem('counter');
    let counter = Number.parseInt(strCount, 10);

    if (!isNaN(counter)) {
        if (counter > this.props.maxCount) {
            counter = this.props.maxCount;
           // console.log('Counter is bigger than MaxCount => descrease it to ' + counter);
        }
        this.setState(() => ({ counter }));
    }
}

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Hi,I am in shouldComponentUpdate');
    if (nextState.counter > nextProps.maxCount) {
        return false;
    }
    return true;
  }

getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('>getSnapshotBeforeUpdate()' + ' --prevProps=' + prevProps.maxCount+ ' --prevState=' + prevState.counter);

    return '[maxCount= ' + prevProps.maxCount + ' & counter= ' + prevState.counter + ']';
}

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('>componentDidUpdate()'
        + ' --prevProps=' + prevProps.maxCount
        + ' --prevState=' + prevState.counter
        + ' --snapshot=' + snapshot);

    if (prevState.counter !== this.state.counter) {
        console.log('save counter value[' + this.state.counter + '] to storage.');
        sessionStorage.setItem('counter', this.state.counter);
    }
  }

  componentWillUnmount() {
      console.log('>componentWillUnmount()');
  }
  displayBaloons=()=>{
    let counter=this.state.counter,
    baloons=[];
    for(let i=0; i<counter; i++){
      baloons.push(<div class="balloon">
      <div></div><div className='contents_on_react16'><a href={constant.REACT_LINK[i]} target="_blank">Click here to know all about {constant.REACT16[i]}</a></div>
      </div>);
    }
    stress_baloons=baloons;
  }
  render() {
    console.log('Hi,I am in StressBuster render');

    if(this.state.counter>0){
      this.displayBaloons();
    }
    return (
        <div>
            <h3>React 16 Sample Approach</h3>
            <div className='counter_wrapper'>
              <h5>MaxCount: {this.props.maxCount}</h5>
              <p>Counter: {this.state.counter}</p>
              <button className='add_butt' onClick={this.add}>ADD+</button>
              <button className='sub_butt' onClick={this.minus}>MINUS-</button>
              </div>
            <br /><br />
            {this.state.counter>0?<div className='set_ballons'>{stress_baloons}</div>:null}
        </div>
    );
  }
}
export default StressBuster;
