import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from './layout';
import { Grid, Col, Row } from 'react-bootstrap';

import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import {
  orange200,
  pink400
} from 'material-ui/styles/colors';

const content = [
  {
    'avatar': <Avatar
      color={orange200}
      backgroundColor={pink400}
      icon={<FontIcon className="material-icons">home</FontIcon>} />,
    'title': 'Bienvenue',
    'description':
    <Row>
      <Col sm={12}>
        <h4 className="title">Présentation du site</h4>
        <List>
          <ListItem>
            Vous pouvez consultez les règles du clan en cliquant sur <strong className="emphasis-word">Les règles</strong> <span style={{ textDecoration: 'underline' }}>ci-dessous</span>.
          </ListItem>
          <ListItem>
            Vous pouvez <Link to="/chat"><strong className="emphasis-word">chatter</strong></Link> avec les autres membres du site.
          </ListItem>
          <ListItem>
            Vous pouvez participer à des <Link to="/polls"><strong className="emphasis-word">sondages</strong></Link> et en créer uniquement si vous êtes chef.
          </ListItem>
          <ListItem>
            Vous pouvez gérer le clan en cliquant sur <Link to="/management"><strong>Gestion</strong></Link> uniquement si vous êtes chef.
          </ListItem>
        </List>
      </Col>
      <Col sm={12}>
        <h4 className="title">Autres</h4>
        <List>
          <ListItem>
            Vous pouvez consulter vos jokers en cliquant <a href="https://docs.google.com/spreadsheets/d/1QCBr09QXwc25PgLwe4im9CAlc8eNvN4iHpfddlQZyLQ/edit#gid=0">ici</a>
          </ListItem>
          <ListItem>
            <p>Ce site a été conçu par un unique développeur. Il est donc possible qu'il y ait quelques bugs.</p>
            <p>Si vous en trouvez un, n'hésitez pas à le signaler dans le chat pour les bugs.</p>
          </ListItem>
          <ListItem>
            Ce site est hébergé gratuitement. Il peut donc être plus lent que d'autres.
          </ListItem>
        </List>
      </Col>
    </Row>
  },
  {
    'avatar': <Avatar
      color={orange200}
      backgroundColor={pink400}
      icon={<FontIcon className="material-icons">announcement</FontIcon>} />,
    'title': 'Les règles',
    'description':
    <Row>
      <Col sm={12}>
        <h4 className="title">Le système des jokers</h4>
        <List>
          <ListItem>
            Un joker se gagne par tranche de 20 couronnes à partir de 25 couronnes.
          </ListItem>
          <ListItem>
            Limite de gain de 5 jokers par coffre (105 couronnes et +) et 10 jokers maximum ! Impossible d'en stocker plus.
          </ListItem>
          <ListItem>
            Vous êtes exclu si vous n'avez plus de joker.
          </ListItem>
        </List>
      </Col>
      <Col sm={12}>
        <h4 className="title">Les coffres de Clan</h4>
        <List>
          <ListItem>
            Vous avez obligation de faire 20 couronnes.
          </ListItem>
          <ListItem>
            Si vous avez en dessous de 10 couronnes : vous perdez un joker.
          </ListItem>
          <ListItem>
            Entre 10 et 20 couronnes : vous ne perdrez pas de jokers si le coffre de clan est fini avant la date limite.
          </ListItem>
          <ListItem>
            Lorsque vous ne jouez pas deux coffres de clan à la suite, vous perdez 2 jokers au lieu d'un.
          </ListItem>
        </List>
      </Col>
      <Col sm={12}>
        <h4 className="title">Aînés</h4>
        <List>
          <ListItem>
            Le grade d'Ainé est obtenu avec le premier joker et est conservé tant que vous avez au moins un joker.
          </ListItem>
        </List>
      </Col>
    </Row>
  }
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  select = (index) => {
    this.setState({
      selected: index
    });
  }

  render() {
    const message = this.props.location.state;
    const contentToShow = content[this.state.selected];
    return (
      <div>
        <Grid fluid>
          {message && <p className="title text-center">{message.message}</p>}
          <Row>
            <Col sm={10} smOffset={1}>
              <Paper className="home-container" zDepth={2}>
                <h1 className="title">ArcadiaA</h1>
                <Divider />
                <div>
                  <h2 className="title">
                    {contentToShow.avatar}
                    <span style={{ marginLeft: "5px" }}>{contentToShow.title}</span>
                  </h2>
                </div>
                <div>
                  {contentToShow.description}
                </div>
                <BottomNavigation selectedIndex={this.state.selected}>
                  <BottomNavigationItem
                    label="Bienvenue"
                    icon={<FontIcon className="material-icons">home</FontIcon>}
                    onTouchTap={() => this.select(0)}
                  />
                  <BottomNavigationItem
                    label="Les règles"
                    icon={<FontIcon className="material-icons">announcement</FontIcon>}
                    onTouchTap={() => this.select(1)}
                  />
                </BottomNavigation>
              </Paper>
            </Col>
          </Row >
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default Home;
