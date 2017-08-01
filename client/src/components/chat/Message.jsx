import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';

import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';

moment.locale('fr');

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'avatar': ''
        };
    };

    componentDidMount() {
        axios.get(`/api/user/${this.props.author}`).then(response => {
            const { avatar } = response.data;
            this.setState({
                avatar: avatar
            });
        });
    }

    render() {
        if (this.state.avatar) {
            return (
                <div>
                    <ListItem>
                        <div>
                            <Avatar src={`http://www.clashapi.xyz/images/cards/${this.state.avatar}.png`} />
                            <span className="message-author">{this.props.author}</span>
                            <span className="small pull-right">{moment(this.props.date).fromNow()}</span>
                        </div>
                        <p className="message-content">{this.props.content}</p>
                    </ListItem>
                </div>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
    }
}

export default Message;