import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  onChangeType = e => {
    this.setState({
      filters: { type: e.target.value }
    });
  };

  onFindPetsClick = e => {
    let url = "/api/pets";
    if (this.state.filters.type !== "all")
      url += `?type=${this.state.filters.type}`;

    return fetch(url)
      .then(resp => resp.json())
      .then(pets => this.setState({ pets }));
  };

  onAdoptPet = (e, pet) => {
    const petsCopy = [...this.state.pets];
    const animalFound = petsCopy.filter(animal => animal.id === pet.id)[0];
    animalFound.isAdopted = !animalFound.isAdopted;
    this.setState({
      pets: petsCopy
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
