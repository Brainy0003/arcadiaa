import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';

import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';

moment.locale('fr');

const Message = (props) => (
    <div>
        <ListItem>
            <div>
                <Avatar src={props.avatar} />
                <span className="message-author">{props.author}</span>
                <span className="small pull-right">{moment(props.date).fromNow()}</span>
            </div>
            <p className="message-content">{props.content}</p>
        </ListItem>
    </div>
)

export default Message;