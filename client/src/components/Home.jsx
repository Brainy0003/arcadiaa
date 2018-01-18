import React from "react";
import { Grid, Col, Row } from "react-bootstrap";

import Paper from "material-ui/Paper";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import FontIcon from "material-ui/FontIcon";
import Avatar from "material-ui/Avatar";
import { orange200, pink400 } from "material-ui/styles/colors";

const Home = () => (
  <div>
    <Grid fluid>
      <Row>
        <Col sm={10} smOffset={1}>
          <Paper className="home-container" zDepth={2}>
            <h1 className="title">ArcadiaA</h1>
            <Divider />
            <div>
              <h2 className="title">
                <Avatar
                  color={orange200}
                  backgroundColor={pink400}
                  icon={
                    <FontIcon className="material-icons">announcement</FontIcon>
                  }
                />
                <span style={{ marginLeft: "5px" }}>Les règles</span>
              </h2>
            </div>
            <div>
              <Row>
                <Col sm={12}>
                  <h4 className="title">Le système des jokers</h4>
                  <List>
                    <ListItem>
                      Un joker se gagne par tranche de 20 couronnes à partir de
                      25 couronnes.
                    </ListItem>
                    <ListItem>
                      Limite de gain de 5 jokers par coffre (105 couronnes et +)
                      et 10 jokers maximum ! Impossible d'en stocker plus.
                    </ListItem>
                    <ListItem>
                      Vous êtes exclu si vous n'avez plus de joker.
                    </ListItem>
                    <ListItem>
                      Vous pouvez consulter vos jokers en cliquant{" "}
                      <a href="https://docs.google.com/spreadsheets/d/1QCBr09QXwc25PgLwe4im9CAlc8eNvN4iHpfddlQZyLQ/edit#gid=0">
                        ici
                      </a>
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
                      Si vous avez en dessous de 10 couronnes : vous perdez un
                      joker.
                    </ListItem>
                    <ListItem>
                      Entre 10 et 20 couronnes : vous ne perdrez pas de jokers
                      si le coffre de clan est fini avant la date limite.
                    </ListItem>
                    <ListItem>
                      Lorsque vous ne jouez pas deux coffres de clan à la suite,
                      vous perdez 2 jokers au lieu d'un.
                    </ListItem>
                  </List>
                </Col>
                <Col sm={12}>
                  <h4 className="title">Aînés</h4>
                  <List>
                    <ListItem>
                      Le grade d'Ainé est obtenu avec le premier joker et est
                      conservé tant que vous avez au moins un joker.
                    </ListItem>
                  </List>
                </Col>
              </Row>
            </div>
          </Paper>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Home;
