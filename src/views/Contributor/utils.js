import { returnAdminsColumns} from './columns';

export const INNER_HEADERS = [
    {
        label: 'Admins',
        singular: 'Admin',
    },
];


export const TABS = {
    ADMINS: 'admins',
}

export const getColumns = (
    innerTab,
    onSort,
    sortColumn,
    // checked,
    // setChecked,
    // handleSelectedIdChange,
    setSelectedIds,
    selectedIds,
    performColumnAction,
  ) => {
    let args = {
      innerTab,
      onSort,
      sortColumn,
      performColumnAction,
      // checked,
      // setChecked,
      setSelectedIds,
      selectedIds,
    }
    switch (innerTab) {
        case TABS.ADMINS:
            return returnAdminsColumns(args);
    }
}