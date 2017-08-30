import React, { Component } from 'react';
import '../Styles/App.css';

import GetImageButton from './GetImageButton.js';
import ImageDisplay from './ImageDisplay.js';

const API_KEY="Z2OH9FtubPivCmMVsIBdpAB7pzhkE54zd7nTmwG3";


export default class GetImageForm extends Component {
  constructor() {
    super();

    this.state = {
      rover: "Curiosity",
      camera: "FHAZ",
      images: [],
      sol: "1000-2000",
    }

    this.fetchRoverImage.bind(this);
    this.handleRover = this.handleRover.bind(this);
    this.handleCamera = this.handleCamera.bind(this);
    this.handleSol = this.handleSol.bind(this);
}

    // handles Rover select box
  handleRover(event) {
    this.setState({rover: event.target.value})
    }

  // handles Camera select box
  handleCamera(event) {
    this.setState({camera: event.target.value}, () => {
      console.log('User has selected ' + this.state.camera);
      console.log(this.state);
    });
  }
  // handles Sol select box
  handleSol(event) {
    this.setState({sol: event.target.value}, () => {
      console.log('User has selected ' + this.state.sol);
      console.log(this.state);
    });
  }

  fetchRoverImage = (event) => {

    let cam = this.state.camera;
    let rove = this.state.rover;
    let num = this.state.sol;

    let imageUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rove}/photos?sol=${num}&camera=${cam}&api_key=${API_KEY}`;


    fetch(imageUrl)
    .then(results => results.json())
    .then(json => {
      console.log("Data from fetch", json)
      this.setState({images: json.photos})
    })
}

render() {
  return (
     <div className="container-fluid">
            <h1>Mars Rover Images</h1>
          <form>
            <label htmlFor="rover">Rover</label>
              <select onChange={this.handleRover} id="rover" value={this.state.rover}>
                <option value="Curiosity">Curiosity</option>
                <option value="Opportunity">Opportunity</option>
                <option value="Spirit">Spirt</option>
              </select>
              <label htmlFor="camera">Camera Type</label>
              <select onChange={this.handleCamera} id="rover" value={this.state.value}>
                <option value="fhaz">FHAZ (Front Hazard)</option>
                <option value="rhaz">RHAZ (Rear Hazard)</option>
                <option value="navcam">NAVCAM (Navigation Cam)</option>
              </select>
              <label htmlFor="sol">Martian Sol: 1000-2000</label>
              <input type="number" onChange={this.handleSol} max="2000" min="1000" value={this.state.value}/>
            </form>

            <div className="App">
              <h1>GetImageForm File is being rendered</h1>
              <GetImageButton action={this.fetchRoverImage} />
              <ImageDisplay images={this.state.images}/>
            </div>

          </div>
      )
}
}
