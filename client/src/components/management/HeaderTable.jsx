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
            ? (
                <span className="badge badge-secondary">{isReversed
                        ? 'Décroissant'
                        : 'Croissant'}</span>
            )
            : null}
    </TableHeaderColumn>
);

export default HeaderTable;