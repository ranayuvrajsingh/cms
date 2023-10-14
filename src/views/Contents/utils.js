import {
  // returnCollectionsColumns,
  returnChannelsColumns,
  // returnExperiencesColumns,
  returnArticlesColumns,
  // returnAuthorsColumns
} from './columns';
import { getFormattedHtmlString } from '../../utils/helper';
import moment from 'moment';

export const INNER_HEADERS = [
  {
    label: 'Articles',
    singular: 'Article',
  },
  {
    label: 'Channels',
    singular: 'Channel',
  },
  // {
  //   label: 'Experiences',
  //   singular: 'Experience',
  // },
  // {
  //   label:'Authors',
  //   singular:'Author'
  // },
  // {
  //   label: 'Gallery Images',
  //   singular: 'Image',
  //   isComingSoon: true,
  // },
  
  // {
  //   label: 'Albums',
  //   singular: 'Album',
  //   isComingSoon: true,
  // },
];

export const TABS = {
  ARTICLES: 'articles',
  CHANNELS: 'channels',
  // EXPERIENCES: 'experiences',
  // ['GALLERY IMAGES']: 'gallery images',
  // AUTHORS:'authors',
  // ALBUMS: 'albums',
};

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
    // handleSelectedIdChange
  };
  switch (innerTab) {
    case TABS.ARTICLES:
      return returnArticlesColumns(args);
    case TABS.CHANNELS:
      return returnChannelsColumns(args);
    // case TABS.EXPERIENCES:
    //   return returnExperiencesColumns(args);
      // case TABS.AUTHORS:
      //   return returnAuthorsColumns(args)
  }
};

export const createPayload = (innerTab, values) => {
  switch (innerTab) {
    case TABS.ARTICLES:
      return {
        title: values?.title,
        shortDescription: values?.summary,
        content: getFormattedHtmlString('', values.articleDetails)?.innerHTML,
        webUrl: values?.webUrl || null,
        coverImage: values?.coverImage,
        // category: values?.category,
        tags: values?.categoryTags,
        city: values.city,
        author:values?.admin,
        // admin:values.admins,
        //isTrending: values.isTrending,
        timeToRead: values.timeToRead?.toString(),
        inApp: values.inApp ||true,
        inWeb: values.inWeb || true,
        isFeatured: values?.isFeatured ||true,
       // channels:values.channels,
      };
    case TABS.CHANNELS:
      const medium = values?.categoryMedium ? (values?.categoryMedium.length > 0 ? values?.categoryMedium : null) : null;
      const articles = values?.categoryArticles ? (values?.categoryArticles.length > 0 ? values?.categoryArticles : null) : null;
      const experiences = values?.categoryExperiences ? (values?.categoryExperiences.length > 0 ? values?.categoryExperiences : null) : null;
      return {
        id:values?.id,
        name: values?.name,
        description: values?.description || null,
        image: values?.image,
        colorCode: values?.colorCode,
        tags: values?.categoryTags,
        city: values?.categoryCity,
        articles:articles,
        medium_type:medium,
        experiences:experiences,
        inApp: values.inApp ||true,
        inWeb: values.inWeb || true,
        isFeatured: values?.isFeatured ||true,
      };
   
  }
};
