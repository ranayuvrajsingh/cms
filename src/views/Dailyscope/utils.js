import { returnAdminsColumns, returnBytesColumns, returnDailynewsColumns, returnRolesColumns, returnTagsColumns, returnWeathersColumns} from './columns';
import { getFormattedHtmlString } from '../../utils/helper';

export const INNER_HEADERS = [
    {
        label: 'Weathers',
        singular: 'Weather',
    },
    {
        label: 'Dailynews',
        singular: 'Dailynews',
    },
    {
        label: 'Bytes',
        singular: 'Byte',
    },
];


export const TABS = {
    WEATHERS: 'weathers',
    DAILYNEWS: 'dailynews',
    BYTES: 'bytes',
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
    performColumnAction,
    setSelectedIds,
    selectedIds,
  };
    switch (innerTab) {
        case TABS.WEATHERS:
            return returnWeathersColumns(args);
        case TABS.DAILYNEWS:
            return returnDailynewsColumns(args);
        case TABS.BYTES:
            return returnBytesColumns(args);
    }
}

export const createPayload = (innerTab, values) => {
    switch (innerTab) {
      case TABS.WEATHERS:
        return {
          description: values?.description,
          city: values.city,
        };
      case TABS.DAILYNEWS:
        return {
          title: values?.title,
          backgroundImage: values?.image,
          mainContent: getFormattedHtmlString('', values.mainContent)?.innerHTML,
          city: values.city,
        };
      case TABS.BYTES:
        return {
          title: values?.title,
          image: values?.image,
          description: values?.description|| null,
          city: values?.categoryCity,
          colorCode:values?.colorCode,
          contentLink: values?.contentLink || null,
        };
    }
  };
  