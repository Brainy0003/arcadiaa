import React from 'react';

import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';

const Poll = (props) => (
    <div>
        <ListItem>
            <p>{props.title}</p>
        </ListItem>
    </div>
);

export default Poll;