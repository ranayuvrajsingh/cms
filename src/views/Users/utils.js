import { returnUserColumns} from './columns';

export const INNER_HEADERS = [
    {
        label: 'Users',
        singular: 'User',
    },
];


export const TABS = {
    USERS: 'users',
}

export const getColumns = (innerTab, onSort, sortColumn, performColumnAction) => {
    switch (innerTab) {
        case TABS.USERS:
            return returnUserColumns(onSort, sortColumn, performColumnAction);
    }
}