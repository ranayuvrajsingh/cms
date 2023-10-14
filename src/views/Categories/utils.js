import { returnCategoryColumns, returnTagsColumn } from './columns';

export const INNER_HEADERS = [
  {
    label: 'Categories',
    singular: 'Category',
  },
  {
    label: 'Tags',
    singular: 'Tag',
  },
];

export const TABS = {
  CATEGORIES: 'categories',
  TAGS: 'tags',
};

export const getColumns = (
  innerTab,
  onSort,
  sortColumn,
  performColumnAction
) => {
  let args = {
    onSort,
    sortColumn,
    performColumnAction,
  };
  switch (innerTab) {
    case TABS.CATEGORIES:
      return returnCategoryColumns(args);
    case TABS.TAGS:
      return returnTagsColumn(args);
  }
};
