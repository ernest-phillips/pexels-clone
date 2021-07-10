import React, { Component } from "react";
import "./App.css";
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
    myHeaders.append(
      "Authorization",
      "***REMOVED***"
    );

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("https://api.pexels.com/v1/curated?per_page=10", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          photos: json.photos,
        });
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  render() {
    let { isLoaded, photos } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <div className="photo-grid">
            {photos.map((photo) => (
              <div className="photos-column">
                <a href={photo.src.large2x}>
                  <li key={photo.id} className="photo">
                    <img
                      src={photo.src.medium}
                      alt={"Photo by " + photo.photographer}
                    ></img>
                  </li>
                </a>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}
export default App;
