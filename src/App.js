import React, { Component } from "react";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hero1: "Ironman",
			hero2: "Doctor Strange",
			heroes: [
				"Ant-Man",
				"Black Panther",
				"Black Widow",
				"Captain America",
				"Doctor Strange",
				"Drax",
				"Gamora",
				"Ironman",
				"Rocket Raccoon",
				"Scarlet Witch",
				"Spiderman",
				"Star-Lord",
				"Superman",
				"Thor",
				"Vision"
			],
			rankedArray: [],
			round: 1
		};
	}

	componentDidMount() {
		if (this.state.round === 1) {
			this.setState({
				hero1: "Ironman",
				hero2: "Scarlet Witch"
			});
		} else if (this.state.round === 2) {
			this.setState({
				hero1: "Vision",
				hero2: "Gamora"
			});
		}
	}

	render() {
		return (
			<div className="outerbox">
				<div className="herobox">
					<img class="images" src={`./img/${this.state.hero1}.jpg`} />
				</div>
				<div className="herobox">
					<img class="images" src={`./img/${this.state.hero2}.jpg`} />
				</div>
			</div>
		);
	}
}

export default App;
