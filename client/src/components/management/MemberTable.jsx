import React from 'react';

import {
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

const classNameBasedOnCrowns = (clanChestCrowns) => {
    if (clanChestCrowns < 10) {
        return 'row-danger';
    } else if (clanChestCrowns >= 10 && clanChestCrowns < 20) {
        return 'row-warning';
    } else {
        return 'row-success';
    }
}

const translateRole = {
    'member': 'Membre',
    'elder': 'Aîné',
    'coLeader': 'Chef adjoint',
    'leader': 'Chef'
};

const MemberTable = ({
    data: {
        name,
        role,
        clanChestCrowns,
        trophies,
        ...rest
    }
}) => (
    <TableRow className={classNameBasedOnCrowns(clanChestCrowns)}>
        <TableRowColumn>{name}</TableRowColumn>
        <TableRowColumn>{translateRole[role]}</TableRowColumn>
        <TableRowColumn>{trophies}</TableRowColumn>
        <TableRowColumn>{clanChestCrowns}</TableRowColumn>
    </TableRow>
);

export default MemberTable;