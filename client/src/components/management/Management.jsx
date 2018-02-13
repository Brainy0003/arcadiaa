import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Loader from '../Loader';
import HeaderTable from './HeaderTable';
import MemberTable from './MemberTable';

import {Table, TableBody, TableHeader, TableRow, TableHeaderColumn} from 'material-ui/Table';

import {loadClanData} from '../../actions/clan';

const rolePriorities = {
    'member': 1,
    'elder': 2,
    'coLeader': 3,
    'leader': 4
};

class Management extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'clanChestCrowns',
            reverse: false
        };

        this.sortArray = this
            .sortArray
            .bind(this);

        this.handleSelect = this
            .handleSelect
            .bind(this);
    }

    async componentDidMount() {
        await this
            .props
            .loadClanData();
    }

    sortArray(array) {
        switch (this.state.selected) {
            case 'name':
                return array.sort((a, b) => {
                    const nameA = a
                        .name
                        .toLowerCase();
                    const nameB = b
                        .name
                        .toLowerCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0
                });
            case 'role':
                return array.sort((a, b) => rolePriorities[a.role] - rolePriorities[b.role]);
            case 'trophies':
                return array.sort((a, b) => a.trophies - b.trophies);
            case 'clanChestCrowns':
                return array.sort((a, b) => a.clanChestCrowns - b.clanChestCrowns);
            default:
                return array;
        }
    }

    handleSelect(name) {
        if (this.state.selected === name) {
            this.setState({
                reverse: !this.state.reverse
            });
        } else {
            this.setState({selected: name, reverse: false});
        }
    }

    render() {
        if (!this.props.isChief) {
            return (<Redirect to="/"/>);
        }
        if (Object.keys(this.props.clan).length === 0) {
            return <Loader/>
        } else {
            const membersSorted = this.sortArray(this.props.clan.members);
            const members = this.state.reverse
                ? membersSorted
                : membersSorted.reverse();

            const tableHeaders = [
                {
                    name: 'name',
                    translation: 'Pseudo'
                }, 
                {
                    name: 'role',
                    translation: 'Rôle'
                }, {
                    name: 'trophies',
                    translation: 'Trophées'
                }, {
                    name: 'clanChestCrowns',
                    translation: 'Couronnes'
                }
            ];

            return (
                <div>
                    <Table>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Numéro</TableHeaderColumn>
                                <TableHeaderColumn>Tag</TableHeaderColumn>
                                {tableHeaders.map((header, i) => <HeaderTable
                                    key={i}
                                    name={header.name}
                                    translation={header.translation}
                                    selected={this.state.selected}
                                    handleSelect={this.handleSelect}
                                    isReversed={this.state.reverse}/>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member, i) => <MemberTable key={i} index={i+1} data={member}/>)}
                        </TableBody>
                    </Table>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({isChief: state.auth.user.isChief, clan: state.clan});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadClanData
}, dispatch);

Management = connect(mapStateToProps, mapDispatchToProps)(Management)

export default Management;