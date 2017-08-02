import React from 'react';
import { Image } from 'react-bootstrap';

const Me = (props) => (
    <div>
        <h4 className="title">{props.username}</h4>
        <Image responsive rounded src={`http://www.clashapi.xyz/images/cards/${props.avatar}.png`} />
    </div>
)

export default Me;