import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';

import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';

moment.locale('fr');

const Message = ({ author, date, avatar, content }) => (
    <div>
        <ListItem>
            <div>
                <Avatar src={avatar} />
                <span className="message-author">{author}</span>
                <span className="small pull-right">{moment(date).fromNow()}</span>
            </div>
            <p className="message-content">{content}</p>
        </ListItem>
    </div>
)

export default Message;