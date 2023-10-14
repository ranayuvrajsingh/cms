import { returnUserColumns} from './columns';
import moment from 'moment';
import {
    returnExperiencesColumns,
  } from './columns';
import { getFormattedHtmlString } from '../../utils/helper';

export const INNER_HEADERS = [
    {
        label: 'Experiences',
        singular: 'Experience',
    },
];


export const TABS = {
    EXPERIENCES: 'experiences',
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
    }
    switch (innerTab) {
        case TABS.EXPERIENCES:
            return returnExperiencesColumns(args);
    }
}
export const createPayload = (innerTab, values) => {
    switch (innerTab) {
      case TABS.EXPERIENCES:
        console.log('values in payload', values)
        // const slots = values?.categorySlots ? (values?.categorySlots.length > 0 ? values?.categorySlots : null) : null;
        return {
          title: values?.title,
          images: values?.imageList
            ?.map((item) => item.url)
            ?.filter((item) => item),
          // coverMedia: values?.coverMediaList
          //   ?.map((item) => item.url)
          //   ?.filter((item) => item),
          hostImage: values?.hostImage || null,
          shortDescription: getFormattedHtmlString('', values.shortDescription)?.innerHTML,
          longDescription: getFormattedHtmlString('', values.longDescription)?.innerHTML,
          pricePerPass: +values?.price,
          vendorAmount: values?.vendorAmount || null,
          minPeopleRequired: values?.minPeopleRequired || 1,
          vendorAccountId: values?.vendorAccountId || null,
          hostDescription: values?.hostDescription || null,
          bookingUrl: values?.bookingUrl || null,
          adminHost:values?.adminHost,
          whatsIncluded: values?.whatsIncluded?.map((item) => item) || null,
          whatsNotIncluded: values?.whatsNotIncluded?.map((item) => item) || null,
          accessibility: values?.accessibility?.map((item) => item) || null,
          offers: values?.offers?.map((item) => item) || null,
          city: values.city,
          webUrl: values?.webUrl || null,
          tags: values?.categoryTags,
          classification: values?.categoryClassification,
          startCsExp: moment(values.startCsExp).toISOString() || null,
          endCsExp: moment(values.endCsExp).toISOString() || null,      
          inApp: values.inApp || true,
          inWeb: values.inWeb || true,
          isListenable: values?.isListenable || false,
          rating: values?.rating || null,
          isFeatured: values.isFeatured || true,
          slots:values?.categorySlots || null,
          venue: values?.venue,
        };
    }
  };
  