import React from "react";

import Pet from "./Pet";

class PetBrowser extends React.Component {
  render() {
    return <div className="ui cards">{this.props.pets.map(pet => <Pet key={pet.id} isAdopted={pet.isAdopted} onAdoptPet={this.props.onAdoptPet} pet={pet} />)}</div>;
  }
}

export default PetBrowser;
