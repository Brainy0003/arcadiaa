import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import { Grid, Row, Col } from 'react-bootstrap';
import { votePoll, loadPolls } from '../../actions/poll';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';
import 'moment/locale/fr';

import Snackbar from 'material-ui/Snackbar';
import Subheader from 'material-ui/Subheader';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

moment.locale('fr');

class Poll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: -1,
            firstLoad: true
        };
    }

    componentDidMount() {
        this.props.loadPolls();
    }

    handleRadioButtonChange = (e, value) => {
        this.setState({ selected: value });
    }

    handleVoteButtonClick = () => {
        if (this.state.selected !== -1) {
            this.props.votePoll(this.props.match.params.pollId, this.props.username, this.state.selected);
        }
    }

    handleRequestClose = () => {
        this.setState({
            firstLoad: false
        });
    }

    render() {
        if (this.props.polls.length !== 0) {
            let poll;
            const polls = this.props.polls;
            for (let i = 0; i < polls.length; i++) {
                if (polls[i]._id === this.props.match.params.pollId) {
                    poll = polls[i]
                }
            }
            let alreadySelected = -1;
            for (let i = 0; i < poll.voters.length; i++) {
                if (poll.voters[i].username === this.props.username) {
                    alreadySelected = poll.voters[i].pos;
                }
            }
            const answers = poll.answers.map(answer => ({ name: answer.answer, y: answer.vote }));
            const config = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: poll.title
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Votes',
                    data: answers
                }]
            }
            return (
                <Grid fluid>
                    <Row>
                        <Col sm={12}>
                            <Subheader>Graphique</Subheader>
                            <ReactHighcharts config={config} ref="chart"></ReactHighcharts>
                        </Col>
                        <Col sm={12}>
                            <Subheader>Réponses</Subheader>
                            <RadioButtonGroup name="answers" onChange={this.handleRadioButtonChange}>
                                {poll.answers.map((answer, i) => (
                                    <RadioButton
                                        key={i}
                                        value={i}
                                        label={answer.answer}
                                        disabled={i === alreadySelected}
                                    />
                                ))}
                            </RadioButtonGroup>
                            <RaisedButton label="Voter" fullWidth primary onClick={this.handleVoteButtonClick} />
                        </Col>
                        <Col sm={12}>
                            <h6 className="title text-center">Proposé par {poll.author} le {moment(poll.date).format('ll')}</h6>
                        </Col>
                    </Row>
                    <Snackbar
                        open={alreadySelected !== -1 && this.state.firstLoad}
                        message="Astuce : vous pouvez changer votre vote !"
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                </Grid>
            )
        } else {
            return (
                <h5 className="title text-center">Chargement...</h5>
            )
        }
    }
}

const mapStateToProps = (state) => ({ username: state.auth.user.username, polls: state.polls });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    votePoll,
    loadPolls
}, dispatch);

Poll = connect(mapStateToProps, mapDispatchToProps)(Poll);

export default Poll;