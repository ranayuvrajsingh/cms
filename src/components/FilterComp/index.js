import Modal from '../Modal';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CancelICon, ChevronButtonIcon, CloseIcon } from '../../assets/svgs';
import './index.scss';
import { Button, Checkbox, Menu, Select, Space, Dropdown } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RootActions from '../../store/root/actions';
import { DateRangePicker } from '../DatePicker/index';
import moment from 'moment';
import { generateOptions } from '../../utils/helper';
import cloneDeep from 'lodash/cloneDeep';
import uniqBy from 'lodash/uniqBy';
import {Modal as AntdModal} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { filter } from 'lodash';

const createCheckBoxOptions = (data) => {
  if (data?.length === 0) return [];
  return data?.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};



  const FilterComp = ({
        setShowFilters,
         showFilters,
         nowactiveFilter,
         isFilterVisible,
         setFilterVisible,
         selectedFilters,
         setSelectedFilters,
         onApply,
         innerTab,
         another,
         setAnother,
         ...props
  }) => {
    

    const [activeFilters, setActiveFilters] = useState({});
    const isFetchingMore = useRef(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
   
    const [dataList, setDataList] = useState({
        cities: {},
        tags: {},
        classifications:{},
        mediums:{},
      });
     
    
    useEffect(() => {
        if (isFilterVisible) {
           
          props.fetchFromReduxOrNetwork('cities');
          props.fetchFromReduxOrNetwork('articles');
          props.fetchFromReduxOrNetwork('tags');
          props.fetchFromReduxOrNetwork('classifications');
          setActiveFilters({
            location: props[innerTab]?.filters?.city__in,
            'isFeatured': props[innerTab]?.filters?.isFeatured,
            'Inactive Content': props[innerTab]?.filters?.isItActive,
            tags: props[innerTab]?.filters?.tags__in,
            'date created':
              props[innerTab]?.filters?.createdAt__gte?.length > 0 &&
              props[innerTab]?.filters?.createdAt__lte?.length > 0
                ? [
                    props[innerTab]?.filters?.createdAt__gte,
                    props[innerTab]?.filters?.createdAt__lte,
                  ]
                : '',
          });
          let tempData = cloneDeep(dataList);
        generateOptions(tempData, props.cities, null, 'cities');
        generateOptions(tempData, props.tags, null, 'tags');
          setDataList(tempData);    
         
        }

        if(selectedFilters.length ==0){
          setAnother({})
        }
      }, [isFilterVisible]);
      

      const ontagChange = (value) => {
        let tempActiveFilters = { ...activeFilters };
        tempActiveFilters[nowactiveFilter] = value;
        setActiveFilters(tempActiveFilters);
        setAnother({...another,tags:value});
      };
      const onChange = (value) => {
        let tempActiveFilters = { ...activeFilters };
        tempActiveFilters[nowactiveFilter] = value;
        setActiveFilters(tempActiveFilters);
        setAnother({...another,location:value});
      };

      const handleDate = (date,dateString) => {
        let dates = dateString.map((el) => moment(el).toISOString());
        let tempActiveFilters = { ...activeFilters };
        tempActiveFilters['date created'] = dates;
        setActiveFilters(tempActiveFilters);
        setAnother({...another,date:dates});
      };

      const getOptions = useCallback(() => {
        switch (nowactiveFilter) {
          case 'location':
            return createCheckBoxOptions(dataList.cities?.readonlyList);
          case 'Tags':
            return createCheckBoxOptions(dataList.tags?.readonlyList);
            //not the best practice use readonlylist
          case 'date created':
            return;
        }
      }, [
        dataList.cities?.readonlylist,
        dataList.tags?.readonlyList,
        nowactiveFilter,
      ]);


      const onScrollEndReached = (event) => {
        if (
          (Math.ceil(event.target.scrollHeight - event.target.scrollTop) ===
            event.target.clientHeight ||
            Math.floor(event.target.scrollHeight - event.target.scrollTop) ===
              event.target.clientHeight) &&
          !isFetchingMore?.current
       ) {
          //TODO: call the logic to fetch another data here
          let filterType = '';
          //   nowactiveFilter == 'location'
          //     ? 'cities'
          //     ? 'Tags'
          //     : 'tags'
          //     : '';
          switch (nowactiveFilter) {
            case 'location':
              filterType = 'cities';
              break;
            case 'Tags':
              filterType = 'tags';
              break;
            default:
              return;
          }
    
          // let page = dataList?.[filterType]?.metadata?.next;
    
          // if (page) {
            isFetchingMore.current = true;
            props
              .fetchDataForInnerTabs(
                filterType,
                // `page=${page}&limit=1000`,
              `limit=1000`,
                true,
                false
              )
              .then((res) => {
                
                let tempData = { ...dataList };
                // tempData[filterType].page = page;
                tempData[filterType].readonlyList = [
                  ...tempData[filterType].readonlyList,
                  ...(res?.data || []),
                ];
                tempData[filterType].metadata = res?.metadata || {};
                tempData[filterType].readonlyList = uniqBy(
                  tempData[filterType].readonlyList,
                  'id'
                );
                setDataList(tempData);
                isFetchingMore.current = false;
              })
              .catch((err) => {
                isFetchingMore.current = false;
              });
          // }
         }
      };
      const menu = (
        <Menu>
           <Menu.Item key="0"> 
                <span>{nowactiveFilter}</span>
                <button className='cancel' onClick={() => {
                    setSelectedFilters(selectedFilters.filter(item => item!==nowactiveFilter))
                    setActiveFilters({...activeFilters, [nowactiveFilter]: ''})
                        // props.updateFilters(innerTab, {});
                        switch(nowactiveFilter){
                          case 'location':
                            setAnother({...another,location:[]})
                            console.log('another is here', another)
                            break;
                          case 'Tags':
                            setAnother({...another,tags:[]})
                            break;
                          case 'date created':
                            setAnother({...another,date:[]})
                            break;
                          case 'isFeatured':
                            setAnother({...another,isFeatured:[]})
                            break;
                          case 'Inactive Content':
                            setAnother({...another,isItActive:[]})
                            console.log('another is here', another)
                            break;
                          default:
                            setAnother({...another})
                        }
                        // nowactiveFilter == 'location' 
                        // ? setAnother({...another,location:[]})  
                        // : nowactiveFilter== 'Tags' 
                        // ? setAnother({...another,tags:[]})
                        // : nowactiveFilter == 'isFeatured'
                        // ? setAnother({...another, isFeatured:null}) 
                        // :nowactiveFilter == 'Inactive Content'
                        // ? setAnother({...another, isItActive:''})
                        // : setAnother({...another,date:[]})
                        
                       
                        // setActiveFilters({});
                        onApply?.({
                          page: 1,
                          city__in: '',
                          category__in: '',
                          createdAt__gte: '',
                          createdAt__lte: '',
                          id__in: '',
                          tags__in: '',
                          isFeatured: '',
                          isItActive:'',
                          tags:'',
                        });
                    }}><CancelICon /></button>
            </Menu.Item>

            <Menu.Item key="1"> 
                {nowactiveFilter == 'date created' ? (
                <DateRangePicker
                    value={activeFilters[nowactiveFilter]}
                    format="YYYY-MM-DD"
                    onChange={handleDate}
                />
                ) : 
                nowactiveFilter == 'location' ? 
                (
                <div onScroll={onScrollEndReached} className='filter-value-section'>
                    <Checkbox.Group
                        className={'filter-value-group'}
                        value={activeFilters[nowactiveFilter]}
                        options={getOptions()}
                        onChange={onChange}
                    />
                </div>
                ):
                nowactiveFilter == 'Tags' ?
                (
                <div onScroll={onScrollEndReached} className='filter-value-section'>
                    <Checkbox.Group
                        className={'filter-value-group'}
                        value={activeFilters[nowactiveFilter]}
                        options={getOptions()}
                        onChange={ontagChange}
                    />  
                </div>  
                ) : null
                }
            </Menu.Item>

            <Menu.Item key="2">
      <Button
          disabled={
            activeFilters?.location?.length === 0 &&
            activeFilters?.categories?.length === 0 &&
            activeFilters['date created']?.length === 0 &&
            activeFilters?.tags?.length === 0
          }
          onClick={() => {
            
            let filters = { ...another };
            filters.page = 1;
            filters.city__in = filters['location'];
            filters.createdAt__gte = filters['date']?.[0];
            filters.createdAt__lte = filters['date']?.[1];
            filters.tags__in = filters['tags'];
            filters.isFeatured = filters['isFeatured'];
            filters.isItActive = filters['isItActive'];
            // delete filters.categories;
            // delete filters.location;
            // delete filters['isFeatured'];
            // delete filters['date created'];
            onApply?.(filters);
          }}
          type="primary"
        >
          Apply
        </Button>
      </Menu.Item>
        </Menu>
      );

    return (
        <div className='filter'>    
            <Dropdown overlay={menu} className='drops' visible={isModalVisible} trigger={["click"]} onClick={(e) => {
                 setIsModalVisible(!isModalVisible)
            }}>
                <a  className="ant-dropdown-link">
                    <span>{nowactiveFilter} </span> <DownOutlined /> 
                </a>
            </Dropdown>
        </div>
    );
  };
  const mapStateToProps = ({
    categories,
    news,
    cities,
    collections,
    experiences,
    states,
    articles,
    tags,
  }) => ({
    articles,
    categories,
    states,
    collections,
    experiences,
    cities,
    news,
    tags,
  });
  const mapDispatchToProps = (dispatch) => ({
    fetchFromReduxOrNetwork: bindActionCreators(
      RootActions.fetchFromReduxOrNetwork,
      dispatch
    ),
    fetchDataForInnerTabs: bindActionCreators(
      RootActions.fetchDataForInnerTabs,
      dispatch
    ),
    updateFilters: bindActionCreators(RootActions.updateFilters, dispatch),
  });
  export default connect(mapStateToProps, mapDispatchToProps)(FilterComp);