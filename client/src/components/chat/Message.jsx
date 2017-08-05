import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import Emojify from 'react-emojione'

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
            <Emojify style={{ marginTop: "5px" }}>
                <p className="message-content">{content}</p>
            </Emojify>
        </ListItem>
    </div>
)

export default Message;