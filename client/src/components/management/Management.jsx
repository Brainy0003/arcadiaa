import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class Management extends Component {
    render() {
        if (!this.props.isChief) {
            return (
                <Redirect to="/" />
            );
        } else {
            return (
                <div>
                    <h4 className="text-center title">Bonjour à vous les chefs ! Cette fonctionnalité n'est pas encore prête... Mais j'y travaille! Patience donc...</h4>
                    {
                        /*
                                        <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Status</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableRowColumn>1</TableRowColumn>
                                <TableRowColumn>John Smith</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>2</TableRowColumn>
                                <TableRowColumn>Randal White</TableRowColumn>
                                <TableRowColumn>Unemployed</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>3</TableRowColumn>
                                <TableRowColumn>Stephanie Sanders</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>4</TableRowColumn>
                                <TableRowColumn>Steve Brown</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>5</TableRowColumn>
                                <TableRowColumn>Christopher Nolan</TableRowColumn>
                                <TableRowColumn>Unemployed</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                    */
                    }
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({ isChief: state.auth.user.isChief });

Management = connect(mapStateToProps)(Management)

export default Management;