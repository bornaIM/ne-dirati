import {Component} from "react";
import React from "react";

class Input extends Component {
  state = {
    text: "inicijalna vrijednost"
  }

  onChange(e) {
    this.setState({text: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({text: "sad sam resetiran"});
    this.props.onSendMessage(this.state.text);
  }

  render() {
    debugger;
    const { label } = this.props;
    const { testPropNekiDrugi } = this.props;
    const { testPropNekiTreci } = this.props;
    return (
      <div className="Input">
        <p>ovo je moj interni state: {this.state.text}</p>
        <form onSubmit={(e) => this.onSubmit(e)}>
          {label}
          <input
            onChange={(e) => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autofocus="true"
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;