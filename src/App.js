import React, { Component } from "react";
import "./App.css";

const API_KEY= process.env.REACT_APP_API_KEY
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
      API_KEY
    );

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      "https://api.pexels.com/v1/curated?page=2&per_page=14",
      requestOptions
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          photos: json.photos,
          result: json.result,
        });
      })
      .then((response) => console.log(response))
      .catch((error) => console.log("error", error));
  }

  render() {
    let { isLoaded, photos, result } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <div className="photo-grid">
            <ul>
              {photos.map((photo) => (
                <li key={photo.id} className="photo">
                  <a href={photo.src.large2x}>
                    <img
                      src={photo.src.medium}
                      alt={"Photo by " + photo.photographer}
                    ></img>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button onClick="">{console.log("My Button")}</button>
          </div>
        </div>
      );
    }
  }
}
export default App;
