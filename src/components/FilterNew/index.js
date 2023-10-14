// import Modal from '../Modal';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { ChevronButtonIcon } from '../../assets/svgs';
// import './index.scss';
// import { Button, Checkbox } from 'antd';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as RootActions from '../../store/root/actions';
// import { DateRangePicker } from '../DatePicker/index';
// import moment from 'moment';
// import { generateOptions } from '../../utils/helper';
// import cloneDeep from 'lodash/cloneDeep';
// import uniqBy from 'lodash/uniqBy';

// const FILTERS = ['categories', 'date created', 'location'];
// const createCheckBoxOptions = (data) => {
//   if (data?.length === 0) return [];
//   return data?.map((item) => ({
//     label: item.name,
//     value: item.id,
//   }));
// };

// const Filter = ({
//   isFilterVisible,
//   setFilterVisible,
//   onApply,
//   innerTab,
//   ...props
// }) => {
//   const [activeFilterType, setActiveFilterType] = useState('categories');
//   const [activeFilters, setActiveFilters] = useState({});
//   const isFetchingMore = useRef(false);
//   const [dataList, setDataList] = useState({
//     cities: {},
//     categories: {},
//   });

//   useEffect(() => {
//     if (isFilterVisible) {
//       props.fetchFromReduxOrNetwork('categories');
//       props.fetchFromReduxOrNetwork('cities');
//       setActiveFilters({
//         categories:
//           props[innerTab]?.filters?.category__in ||
//           props[innerTab]?.filters?.id__in,
//         location: props[innerTab]?.filters?.city__in,
//         'date created':
//           props[innerTab]?.filters?.createdAt__gte?.length > 0 &&
//           props[innerTab]?.filters?.createdAt__lte?.length > 0
//             ? [
//                 props[innerTab]?.filters?.createdAt__gte,
//                 props[innerTab]?.filters?.createdAt__lte,
//               ]
//             : '',
//       });
//       let tempData = cloneDeep(dataList);
//       generateOptions(tempData, props.cities, null, 'cities');
//       generateOptions(tempData, props.categories, null, 'categories');
//       setDataList(tempData);
//     }
//   }, [isFilterVisible]);

//   const onChange = (values) => {
//     let obj = {
//       ...activeFilters,
//       [activeFilterType]: values,
//     };
//     setActiveFilters(obj);
//   };
//   const handleDate = (date, dateString) => {
//     let dates = dateString.map((el) => moment(el).toISOString());
//     let obj = {
//       ...activeFilters,
//       [activeFilterType]: dates,
//     };
//     setActiveFilters(obj);
//   };

//   const getFilterCount = (category) => {
//     if (!activeFilters[category]?.length) return '';
//     return `(${activeFilters[category]?.length})`;
//   };

//   const getOptions = useCallback(() => {
//     switch (activeFilterType) {
//       case 'categories':
//         return createCheckBoxOptions(dataList.categories?.readonlyList);
//       case 'location':
//         return createCheckBoxOptions(dataList.cities?.readonlyList);
//       case 'date created':
//         return;
//     }
//   }, [
//     dataList.categories?.readonlyList,
//     dataList.cities?.readonlylist,
//     activeFilterType,
//   ]);

//   useEffect(() => {
//     setActiveFilters({});
//     setActiveFilterType('categories');
//   }, [innerTab]);

//   const onScrollEndReached = (event) => {
//     if (
//       (Math.ceil(event.target.scrollHeight - event.target.scrollTop) ===
//         event.target.clientHeight ||
//         Math.floor(event.target.scrollHeight - event.target.scrollTop) ===
//           event.target.clientHeight) &&
//       !isFetchingMore?.current
//     ) {
//       //TODO: call the logic to fetch another data here

//       let filterType =
//         activeFilterType == 'categories'
//           ? 'categories'
//           : activeFilterType == 'location'
//           ? 'cities'
//           : '';

//       let page = dataList?.[filterType]?.metadata?.next;

//       if (page) {
//         isFetchingMore.current = true;
//         props
//           .fetchDataForInnerTabs(
//             filterType,
//             `page=${page}&limit=10`,
//             true,
//             false
//           )
//           .then((res) => {
//             let tempData = { ...dataList };
//             tempData[filterType].page = page;
//             tempData[filterType].readonlyList = [
//               ...tempData[filterType].readonlyList,
//               ...(res?.data || []),
//             ];
//             tempData[filterType].metadata = res?.metadata || {};
//             tempData[filterType].readonlyList = uniqBy(
//               tempData[filterType].readonlyList,
//               'id'
//             );
//             setDataList(tempData);
//             isFetchingMore.current = false;
//           })
//           .catch((err) => {
//             isFetchingMore.current = false;
//           });
//       }
//     }
//   };

//   return (
//     <Modal
//       width="1000px"
//       title={
//         <p className="flex items-center color-black weight-700 size-20">
//           Apply Filter
//         </p>
//       }
//       destroyOnClose
//       onCancel={() => {
//         setFilterVisible(false);
//       }}
//       visible={isFilterVisible}
//       className={'filter-section'}
//     >
//       <div className="flex flex-row">
//         <div className={'filter-category-section'}>
//           {FILTERS.map((item) => (
//             <div
//               onClick={() => {
//                 setActiveFilterType(item);
//               }}
//               className={[
//                 'flex flex-row justify-between filter-category',
//                 activeFilterType === item ? 'active' : '',
//               ].join(' ')}
//             >
//               <div className="flex flex-row items-center">
//                 <p className={'filter-label'}>{item}</p>
//                 <span>{getFilterCount(item)}</span>
//               </div>
//               <ChevronButtonIcon />
//             </div>
//           ))}
//         </div>
//         <div onScroll={onScrollEndReached} className={'filter-value-section'}>
//           <Checkbox.Group
//             className={'filter-value-group'}
//             value={activeFilters[activeFilterType]}
//             options={getOptions()}
//             onChange={onChange}
//           />
//           {activeFilterType == 'date created' ? (
//             <DateRangePicker
//               value={activeFilters[activeFilterType]}
//               format="YYYY-MM-DD"
//               onChange={handleDate}
//             />
//           ) : null}
//         </div>
//       </div>
//       <div className="buttons">
//         <Button
//           disabled={
//             activeFilters?.location?.length === 0 &&
//             activeFilters?.categories?.length === 0 &&
//             activeFilters['date created']?.length === 0
//           }
//           onClick={() => {
//             let filters = { ...activeFilters };
//             filters.page = 1;
//             filters.city__in = filters['location'];
//             {
//               innerTab === 'categories'
//                 ? (filters.id__in = filters['categories'])
//                 : (filters.category__in = filters['categories']);
//             }

//             filters.createdAt__gte = filters['date created']?.[0];
//             filters.createdAt__lte = filters['date created']?.[1];

//             delete filters.categories;
//             delete filters.location;
//             delete filters['date created'];

//             onApply?.(filters);
//           }}
//           type="primary"
//         >
//           Apply
//         </Button>
//         <Button
//           onClick={() => {
//             props.updateFilters(innerTab, {});
//             setActiveFilters({});
//             onApply?.({
//               page: 1,
//               city__in: '',
//               category__in: '',
//               createdAt__gte: '',
//               createdAt__lte: '',
//               id__in: '',
//             });
//           }}
//           type="text-button"
//           style={{
//             marginLeft: 15,
//             padding: '0 30px',
//             // paddingLeft: 40,
//           }}
//         >
//           Reset
//         </Button>
//       </div>
//     </Modal>
//   );
// };
// const mapStateToProps = ({
//   categories,
//   news,
//   cities,
//   collections,
//   experiences,
//   states,
//   articles,
// }) => ({
//   articles,
//   categories,
//   states,
//   collections,
//   experiences,
//   cities,
//   news,
// });

// const mapDispatchToProps = (dispatch) => ({
//   fetchFromReduxOrNetwork: bindActionCreators(
//     RootActions.fetchFromReduxOrNetwork,
//     dispatch
//   ),
//   fetchDataForInnerTabs: bindActionCreators(
//     RootActions.fetchDataForInnerTabs,
//     dispatch
//   ),
//   updateFilters: bindActionCreators(RootActions.updateFilters, dispatch),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(Filter);