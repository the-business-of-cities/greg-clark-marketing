import React from "react";
import ReactTransitionGroup from "react-addons-transition-group";
import Velocity from "velocity-animate";

// --------------------------------------------------

export class Fader extends React.Component {
	constructor(props) {
		super(props);
		this.ref = this.ref.bind(this);
		["fadeIn", "fadeOut", "slideDown", "slideUp",].map(
			name => (this[name] = this[name].bind(this)),
		);
	}

	fadeIn(cb) {
		Velocity(
			this._wrapper,
			{
				opacity: 1,
			},
			{
				duration: this.props.fadeDuration,
				complete: cb,
				mobileHA: false,
			},
		);
	}

	fadeOut(cb) {
		Velocity(
			this._wrapper,
			{
				opacity: 0,
			},
			{
				duration: this.props.fadeDuration,
				complete: cb,
				mobileHA: false,
			},
		);
	}

	slideDown(cb) {
		Velocity(
			this._wrapper,
			{
				maxHeight: "1000px",
			},
			{
				duration: this.props.fadeDuration,
				complete: cb,
			},
		);
	}

	slideUp(cb) {
		Velocity(
			this._wrapper,
			{
				maxHeight: 0,
			},
			{
				duration: this.props.fadeDuration,
				complete: cb,
			},
		);
	}

	componentWillEnter(cb) {
		try {
			this._wrapper.style.opacity = 0;
			if (this.props.slide) {
				this._wrapper.style.maxHeight = 0;
				this.slideDown(() => this.fadeIn(cb));
			} else {
				this.fadeIn(cb);
			}
		} catch (err) {
			console.log("something went wrong with componentWillEnter");
			cb();
		}
	}

	componentWillLeave(cb) {
		try {
			if (this.props.slide) {
				this.fadeOut(() => this.slideUp(cb));
			} else {
				this.fadeOut(cb);
			}
		} catch (err) {
			console.log("something went wrong with componentWillLeave");
			cb();
		}
	}

	ref(comp) {
		this._wrapper = comp || this._wrapper;
	}

	render() {
		return (
			<div ref = { this.ref }>
				{this.props.children}
			</div>
		);
	}

	defaultProps = {
		fadeDuration: 300,
	};
}

// --------------------------------------------------

const FirstChild = props => React.Children.toArray(props.children)[0] || null;

// --------------------------------------------------

export default props =>
	<ReactTransitionGroup component = { FirstChild }>
		{ props.visible
			? <Fader fadeDuration = { props.fadeDuration } slide = { props.slide }>
				{props.children}
			</Fader>
			: null
		}
	</ReactTransitionGroup>;
