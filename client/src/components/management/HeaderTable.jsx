import React from 'react';

import {TableHeaderColumn} from 'material-ui/Table';
import Badge from 'material-ui/Badge';

const HeaderTable = ({name, selected, isReversed, translation, handleSelect}) => (
    <TableHeaderColumn
        className={selected === name
        ? 'selected'
        : ''}
        onClick={() => handleSelect(name)}>
        {translation}
        {selected === name
            ? (<Badge
                badgeContent={isReversed
                ? 'Décroissant'
                : 'Croissant'}
                primary={true}/>)
            : null}
}
    </TableHeaderColumn>
);

export default HeaderTable;