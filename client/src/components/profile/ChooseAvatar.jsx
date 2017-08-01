import React, { Component } from 'react';
import axios from 'axios';
import { changeAvatar } from '../../actions/profile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

    componentDidMount() {
        axios.get('/api/clashroyale/cards').then(response => {
            const cards = response.data;
            this.setState({ cards: cards })
        });
    }

    render() {
        if (this.state.cards.length !== 0) {
            return (
                <div style={styles.root}>
                    <GridList style={styles.gridList}>
                        {this.state.cards.map(card => (
                            <GridTile
                                key={card}
                                onClick={() => this.props.changeAvatar(card, this.props.user.id)}
                                title={this.props.user.avatar === card && 'Votre avatar'}
                            >
                                <img src={`http://www.clashapi.xyz/images/cards/${card}.png`} alt={card} />
                            </GridTile>
                        ))}
                    </GridList>
                </div>
            )
        } else {
            return (
                <p>Chargement...</p>
            )
        }
    }
}

const mapStateToProps = (state) => ({ user: state.auth.user });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    changeAvatar
}, dispatch);

ChooseAvatar = connect(mapStateToProps, mapDispatchToProps)(ChooseAvatar);

export default ChooseAvatar;