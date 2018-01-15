import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Snackbar from 'material-ui/Snackbar';

import {removeFlashMessage} from '../../actions/flash';

class FlashMessage extends Component {
    componentDidMount() {
        setTimeout(() => {
            this
                .props
                .removeFlashMessage(this.props.id);
        }, 3000);
    }

    render() {
        return (<Snackbar open={true} message={this.props.content} autoHideDuration={4000}/>);
    }
}

FlashMessage.propTypes = {
    content: PropTypes.string,
    alertClassName: PropTypes.string,
    id: PropTypes.number,
    key: PropTypes.number
};

const mapDispatchToProps = dispatch => bindActionCreators({
    removeFlashMessage
}, dispatch);

FlashMessage = connect(null, mapDispatchToProps)(FlashMessage);

export default FlashMessage;