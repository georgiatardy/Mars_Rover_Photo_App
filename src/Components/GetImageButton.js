import React, { Component } from 'react';


export default class GetImageButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
             <button onClick={this.props.action} style={this.props.style}>{this.props.prompt}</button>

    );
  }
}
