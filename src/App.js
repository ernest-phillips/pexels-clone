import React, { Component } from "react";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_KEY;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", API_KEY);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("https://api.pexels.com/v1/curated?page=1&per_page=31", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          photos: json.photos,
          next_page: json.next_page,
        });
      })
      .then((response) => console.log(response))
      .catch((error) => console.log("error", error));
  }

  render() {
    let { isLoaded, photos, next_page } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          
          <div className="container">
          <header className="App-header"></header>
            <ul>
              {photos.map((photo) => (
                <li key={photo.id} className="photo">
                  <a href={photo.src.large2x}>
                    <img
                      src={photo.src.large}
                      alt={"Photo by " + photo.photographer}
                    ></img>
                  </a>
                </li>
              ))}
            </ul>
            <div>
            <button className="more-btn">More</button>
          </div>
          </div>

          
        </div>
      );
    }
  }
}
export default App;
