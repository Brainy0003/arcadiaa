import React from "react";

import { Grid, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

const jokerListItem = [
  `Un joker se gagne par tranche de 20 couronnes à partir de 20 couronnes`,
  `Limite de gain de 5 jokers par coffre (Au dessus de 100 couronnes, vous n'obtenez rien)`,
  `10 jokers maximum ! Impossible d'en stocker plus !`,
  `Vous êtes exclu si vous n'avez plus de joker`
];

const clanListItem = [
  `Vous devez faire plus de 20 couronnes`,
  `Si vous avez en dessous de 10 couronnes : vous perdez un joker`,
  `Entre 10 et 20 couronnes : vous ne perdrez pas de jokers si le
  coffre de clan est fini avant la date limite`,
  `Lorsque vous ne jouez pas deux coffres de clan à la suite, vous perdez 2 jokers au lieu d'un`
];

const Home = () => (
  <Grid fluid>
    <Row>
      <Col xs={6}>
        <h2>Les jokers</h2>
        <ListGroup>
          {jokerListItem.map((text, i) => (
            <ListGroupItem>{text}</ListGroupItem>
          ))}
        </ListGroup>
      </Col>
      <Col xs={6}>
        <h2>Les coffres de clan</h2>
        <ListGroup>
          {clanListItem.map((text, i) => <ListGroupItem>{text}</ListGroupItem>)}
        </ListGroup>
      </Col>
    </Row>
  </Grid>
);

export default Home;
