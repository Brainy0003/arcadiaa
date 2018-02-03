import React, { Component } from "react";
import { addMessage } from "../../actions/chat";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class AddMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  handleMessageChange = e => {
    this.setState({ message: e.target.value });
  };

  handleKeyPress = e => {
    const key = e.nativeEvent.keyCode;
    if (key === 13) {
      this.handleSubmitClick();
    }
  };

  handleSubmitClick = () => {
    let message = this.state.message.trim();
    const room = this.props.currentRoom ? this.props.currentRoom : "general";
    if (message.length !== 0 && message.length < 500) {
      this.props.addMessage({
        content: message,
        author: this.props.user.username,
        room,
        date: Date.now()
      });
      this.setState({ message: "" });
    }
  };

  render() {
    return (
      <div className="row">
        <div className="ten columns">
          <input
            className="u-full-width"
            value={this.state.message}
            onChange={this.handleMessageChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className="two columns">
          <button
            className="button-primary"
            type="button"
            onClick={this.handleSubmitClick}
          >
            Envoyer
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  currentRoom: state.chat.currentRoom
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addMessage
    },
    dispatch
  );

AddMessage = connect(mapStateToProps, mapDispatchToProps)(AddMessage);

export default AddMessage;
