import React from 'react';
import {Component} from 'react';


export default class Support extends Component {
  askUltimateQuestion() {
      alert('the answer is 42');
  }

  render() {
    return (
      <form onSubmit={this.askUltimateQuestion}>
      <input type="text" className="support" placeholder="ask us anything" />
      </form>
    )
  }}
