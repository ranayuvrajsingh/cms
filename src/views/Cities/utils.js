import { returnCityColumns, returnStatesColumns } from './columns';

export const INNER_HEADERS = [
    {
        label: 'Cities',
        singular: 'City',
    },
    {
        label: 'States',
        singular: 'State',
    },
];


export const TABS = {
    CITIES: 'cities',
    STATES: 'states',
}

export const getColumns = (
    innerTab,
  onSort,
  sortColumn,
  setSelectedIds,
  selectedIds,
  performColumnAction,
  ) => {
    let args = {
        innerTab,
        onSort,
        sortColumn,
        setSelectedIds,
        selectedIds,
        performColumnAction,
    };
    switch (innerTab) {
        case TABS.CITIES:
            console.log('args are',args)
            return returnCityColumns(args);
        case TABS.STATES:
            return returnStatesColumns(args);
    }
}
