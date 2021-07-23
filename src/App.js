import React, { Component } from "react";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_KEY;
let BASE_URL = "https://api.pexels.com/v1/curated?page=1&per_page=9";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      isLoaded: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", API_KEY);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(BASE_URL, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          photos: json.photos,
          next_page: json.next_page,
        });
      })

      .catch((error) => console.log("error", error));
  }

  handleClick() {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", API_KEY);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(this.state.next_page, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        this.setState((prevState) => ({
          isLoaded: true,
          photos: prevState.photos.concat(json.photos),
          next_page: json.next_page,
        }));
      });
  }

  render() {
    let { isLoaded, photos } = this.state;

    let height = (photos.length * 650) / 3;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <div className="container">
            <header className="App-header"></header>
            <ul className="list" style={{ height: height }}>
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
              <button onClick={this.handleClick} className="more-btn">
                More
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default App;
