import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import _ from "lodash";

class App extends Component {
	constructor() {
		super();
		this.state = {
			leftHero: 0,
			rightHero: 1,
			heroes: [
				{ name: "Ant-Man" },
				{ name: "Black Panther" },
				{ name: "Black Widow" },
				{ name: "Captain America" },
				{ name: "Doctor Strange" },
				{ name: "Drax" },
				{ name: "Falcon" },
				{ name: "Gamora" },
				{ name: "Hawkeye" },
				{ name: "Rocket Raccoon" },
				{ name: "Spiderman" },
				{ name: "Star-Lord" },
				{ name: "Thor" },
				{ name: "Vision" },
				{ name: "War Machine" }
			],
			rankedArray: [],
			rightHero: "",
			leftHero: { name: "Ironman" },
			round: 0,
			open: true
		};
		this.pickLeft = this.pickLeft.bind(this);
	}

	componentWillMount() {
		let pullNumber = Math.floor(Math.random() * this.state.heroes.length);
		console.log(this.state);
		this.setState({
			total: this.state.heroes.length + 1,
			rightHero: this.state.heroes.splice(pullNumber, 1)[0]
		});
	}

	setHeroes = () => {
		let rightNumber = Math.floor(Math.random() * this.state.heroes.length);
		let leftNumber = Math.floor(this.state.rankedArray.length / 2);
		console.log(leftNumber);
		this.setState({
			rightHero: this.state.rankedArray[leftNumber],
			leftHero: this.state.heroes.splice(rightNumber, 1)[0]
		});
	};

	// If user picks right, they always go down, if they pick left they go up. Create shallow arrays based on feedback

	rankedList = () => {
		return this.state.rankedArray.map((hero, i) => {
			return (
				<div>
					{i + 1}) {hero.name}
				</div>
			);
		});
	};

	pickLeft = () => {
		if (this.state.pickedArray) {
			if (this.state.pickedArray.length === 1) {
				var index = this.state.rankedArray.findIndex(
					i => i.name === this.state.rightHero.name
				);
				console.log(index);
				let tempRankedArray = this.state.rankedArray;
				tempRankedArray.splice(index, 0, this.state.leftHero);
				console.log(tempRankedArray);
				this.setState({
					rankedArray: tempRankedArray,
					pickedArray: null
				});
				this.setHeroes();
			} else {
				console.log("ran if");
				let tempArray = this.state.pickedArray.slice(
					0,
					Math.floor(this.state.pickedArray.length / 2)
				);
				this.setState({
					pickedArray: tempArray,
					rightHero: tempArray[Math.floor(tempArray.length / 2)]
				});
			}
		} else if (!this.state.pickedArray) {
			console.log("ran if not");
			let tempArray = this.state.rankedArray.slice(
				0,
				Math.floor(this.state.rankedArray.length / 2)
			);
			console.log(tempArray, tempArray[Math.floor(tempArray.length / 2)]);
			this.setState({
				pickedArray: tempArray,
				rightHero: tempArray[Math.floor(tempArray.length / 2)]
			});
		}
	};

	pickRight = () => {
		if (this.state.pickedArray) {
			if (this.state.pickedArray.length === 1) {
				var index = this.state.rankedArray.findIndex(
					i => i.name === this.state.rightHero.name
				);
				console.log(index);
				let tempRankedArray = this.state.rankedArray;
				tempRankedArray.splice(index + 1, 0, this.state.leftHero);
				console.log(tempRankedArray);
				this.setState({
					rankedArray: tempRankedArray,
					pickedArray: null
				});
				this.setHeroes();
			} else {
				console.log("ran if");
				let tempArray = this.state.pickedArray.slice(
					Math.ceil(this.state.pickedArray.length / 2),
					this.state.pickedArray.length
				);
				this.setState({
					pickedArray: tempArray,
					rightHero: tempArray[Math.floor(tempArray.length / 2)]
				});
			}
		} else if (!this.state.pickedArray) {
			console.log("ran if not");
			let tempArray = this.state.rankedArray.slice(
				Math.ceil(this.state.rankedArray.length / 2),
				this.state.rankedArray.length
			);
			console.log(tempArray, tempArray[Math.floor(tempArray.length / 2)]);
			this.setState({
				pickedArray: tempArray,
				rightHero: tempArray[Math.floor(tempArray.length / 2)]
			});
		}
	};

	handleClose = () => {
		this.setState({
			open: false
		});
	};

	pickRightFirst = () => {
		let tempArray = this.state.rankedArray;
		tempArray.push(this.state.rightHero, this.state.leftHero);
		this.setState({
			rankedArray: tempArray
		});
		this.setHeroes();
	};

	pickLeftFirst = () => {
		let tempArray = this.state.rankedArray;
		tempArray.push(this.state.leftHero, this.state.rightHero);
		this.setState({
			rankedArray: tempArray
		});
		this.setHeroes();
	};

	render() {
		const {
			leftHero,
			rightHero,
			heroes,
			rankedArray,
			currentHero,
			total,
			open
		} = this.state;
		const actions = [
			<FlatButton
				label="Let's get started"
				onClick={() => this.handleClose()}
			/>
		];
		if (rankedArray.length === total) {
			return (
				<div className="winning-herobox">
					<img className="images" src={`./img/${rankedArray[0].name}.jpg`} />
					<MuiThemeProvider>
						<Dialog
							overlayStyle={{ backgroundColor: "transparent" }}
							style={{ width: "30%", marginLeft: "35%" }}
							open={true}
						>
							<h3 style={{ textAlign: "center" }}> Your MCU Hero Ranking </h3>
							{this.rankedList()}
						</Dialog>
					</MuiThemeProvider>
				</div>
			);
		} else if (rankedArray.length === 0) {
			return (
				<div className="outerbox">
					<MuiThemeProvider>
						<Dialog
							style={{ width: "50%", marginLeft: "25%" }}
							open={open}
							actions={actions}
							modal={true}
						>
							<h3 style={{ textAlign: "center" }}>
								{" "}
								Welcome to the MCU Superhero Showdown!{" "}
							</h3>
							Pick your favourite hero as they go head-to-head and receive your
							very own ranking when you're finished
							{this.rankedList()}
						</Dialog>
					</MuiThemeProvider>
					<div className="herobox">
						<img
							className="images"
							onClick={() => this.pickLeftFirst()}
							src={`./img/${leftHero.name}.jpg`}
						/>
					</div>
					<div className="herobox">
						<img
							className="images"
							src={`./img/${rightHero.name}.jpg`}
							onClick={() => this.pickRightFirst()}
						/>
					</div>
				</div>
			);
		} else {
			return (
				<div className="outerbox">
					<div className="herobox">
						<img
							className="images"
							onClick={() => this.pickLeft()}
							src={`./img/${this.state.leftHero.name}.jpg`}
						/>
					</div>
					<div className="herobox">
						<img
							className="images"
							onClick={() => this.pickRight()}
							src={`./img/${this.state.rightHero.name}.jpg`}
						/>
					</div>
				</div>
			);
		}
	}
}

export default App;
