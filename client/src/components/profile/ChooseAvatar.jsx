import React, { Component } from 'react';
import axios from 'axios';

import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    }
};

class ChooseAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }

    async componentDidMount() {
        const cards = await axios.get('/api/clashroyale/cards');
        this.setState({ cards: cards.data });
    }

    render() {
        if (this.state.cards.length !== 0) {
            return (
                <div style={styles.root}>
                    <GridList style={styles.gridList}>
                        {this.state.cards.map(card => (
                            <GridTile
                                key={card}
                                onClick={() => this.props.changeAvatar(card, this.props.id)}
                                title={this.props.avatar === card && 'Votre avatar'}
                            >
                                <img src={`http://www.clashapi.xyz/images/cards/${card}.png`} alt={card} />
                            </GridTile>
                        ))}
                    </GridList>
                </div>
            )
        } else {
            return (
                <h5 className="title">Chargement...</h5>
            )
        }
    }
}

export default ChooseAvatar;