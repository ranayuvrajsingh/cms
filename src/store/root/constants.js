export const initialDataState = {
  list: [],
  readonlyList: [], //this is a readonly data store for static data used in filters, category headers etc
  metadata: {},
  filters: {
    limit: 10,
    page: 1,
    sort: 'createdAt',
    sortBy: 'DESC',
    id__in: [],
  },
  loading: false,
  fetching: false,
  error: null,
};
