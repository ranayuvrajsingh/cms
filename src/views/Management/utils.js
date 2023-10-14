import { returnAdminsColumns, returnRolesColumns, returnTagsColumns} from './columns';

export const INNER_HEADERS = [
    {
        label: 'Tags',
        singular: 'Tag',
    },
    {
        label: 'Roles',
        singular: 'Role',
    },
];


export const TABS = {
    TAGS: 'tags',
    ROLES: 'roles',
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
  };
    switch (innerTab) {
        case TABS.TAGS:
            return returnTagsColumns(args);
        case TABS.ROLES:
            return returnRolesColumns(args);
    }
}

export const createPayload = (innerTab, values) => {
    switch (innerTab) {
      case TABS.TAGS:
        return {
          name: values?.name,
          shortDescription: values?.shortDescription || null,
          image: values?.image,
        };
      case TABS.ROLES:
        return {
          name: values?.name,
          permissions: values?.categoryPermissions,
        };
    }
  };