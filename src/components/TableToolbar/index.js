import { Button, Input, Tooltip, Dropdown, Menu,Icon, Space, MenuProps } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import './index.scss';
import { FilterIcon, UploadIcon, SearchIcon,FilterIcon2 } from '../../assets/svgs';
import { useEffect, useState } from 'react';
import { exportAsExcel } from '../../utils/helper';
import moment from 'moment';
import Filter from '../Filter';
import throttle from 'lodash/throttle';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { imagesUrl } from '../../constants/imagesUrl';
import FilterNew from '../FilterNew';
import FilterComp from '../FilterComp';

const TOOLS = {
  EXPORT_DATA: 'export_data',
  FILTERS: 'filters',
};



const SEARCH_TIMEOUT = 750;
const TableToolbar = ({
  onClickAdd,
  ctaLabel = '',
  showSearch = true,
  onSearch = () => {},
  innerTab,
  query = '',
  onApplyFilters = () => {},
  showFilter,
  ...props
}) => {
  const [activeTool, setActiveTool] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  let throttledOnChange = throttle(onSearch, SEARCH_TIMEOUT);
  const [throttleSearch, setThrottleSearch] = useState(() => throttledOnChange);
  const [activeFilter, setActiveFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showSearchbar, setShowSearchbar] = useState(true);
  const [another, setAnother] = useState({});
   console.log('another in tabletoolbar', another)
  const menu = (
    <Menu onClick={({key}) => {
      setFilterVisible(true);
  setActiveTool(TOOLS.FILTERS);
  setShowFilters(true);
     
    }}>
     {innerTab !=='tags' &&
      <Menu.Item key="1" onClick={() => {
        
        setActiveFilter('location');
        if(selectedFilters.includes('location')){
        setSelectedFilters([...selectedFilters]);
        }
        else {
          setSelectedFilters([...selectedFilters, 'location']);
        }
      }}>
        <span>Location</span>
      </Menu.Item>
}
      <Menu.Item key="2" onClick={() => {
        setActiveFilter('date created');
        if(selectedFilters.includes('date created')){
        setSelectedFilters([...selectedFilters]);
        }else{
          setSelectedFilters([...selectedFilters, 'date created']);
        }
      }}>
        <span>Date</span>
      </Menu.Item>
      <Menu.Item key="3" onClick={() => {
        setActiveFilter('Inactive Content');
        if(selectedFilters.includes('Inactive Content')){
        setSelectedFilters([...selectedFilters]);
        }
        else {
          setSelectedFilters([...selectedFilters, 'Inactive Content']);
        }
        setAnother({...another, isItActive: 'false'});
      }}>
        <span>Inactive</span>
      </Menu.Item>
      {/* {innerTab ==='articles' || innerTab =='channels' || innerTab =='experiences' && */}
      <Menu.Item key="4" onClick={() => {
        setActiveFilter('isFeatured');
        if(selectedFilters.includes('isFeatured')){
        setSelectedFilters([...selectedFilters]);}
        else {
          setSelectedFilters([...selectedFilters, 'isFeatured']);
        }
        setAnother({...another, isFeatured: true});
      }}>
        <span>Starred</span>
      </Menu.Item>
{/* } */}


      <Menu.Item key="5" onClick={() => {
        setActiveFilter('Tags');
        if(selectedFilters.includes('Tags')){
        setSelectedFilters([...selectedFilters]);}
        else {
          setSelectedFilters([...selectedFilters, 'Tags']);
        }
      }}>
        <span>Tags</span>
      </Menu.Item>

      {/* <Menu.Item key="6" onClick={() => {
        setActiveFilter('classification');
        if(selectedFilters.includes('classification')){
        setSelectedFilters([...selectedFilters]);}
        else {
          setSelectedFilters([...selectedFilters, 'classification']);
        }
      }}>
        <span>Classification</span>
      </Menu.Item>
      <Menu.Item key="7" onClick={() => {
        setActiveFilter('medium');
        if(selectedFilters.includes('medium')){
        setSelectedFilters([...selectedFilters]);}
        else {
          setSelectedFilters([...selectedFilters, 'medium']);
        }
      }}>
        <span>Medium</span>
      </Menu.Item> */}
      
    </Menu>
  ); 
    

  useEffect(() => {
    if(selectedFilters.length==0){
      setAnother({});
    }
  },[selectedFilters.length])

  //SEARCHING_EFFECTS//
  useEffect(() => {
    setThrottleSearch(() => {
      return (throttledOnChange = throttle(onSearch, SEARCH_TIMEOUT));
    });
    setSelectedFilters([]);
    
    // setShowFilters(false);
  }, [innerTab]);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);
  //SEARCHING_EFFECTS//
  console.log('inn',innerTab)
  const isFilterActive = () => {
    return (
      !isEmpty(props[innerTab]?.filters?.category__in) ||
      !isEmpty(props[innerTab]?.filters?.city__in) ||
      !isEmpty(props[innerTab]?.filters?.createdAt__gte) ||
      !isEmpty(props[innerTab]?.filters?.createdAt__lte) ||
      !isEmpty(props[innerTab]?.filters?.id__in)
    );
  };

  return (
    <div className='whole_table_toolbar'>
    <div className="pl-40 pr-40 pb-10 table-toolbar">
      
     
      <div className="pt-20 flex items-center table-right">
          {showFilters &&  selectedFilters.map((filter) => {
            return <FilterComp
            innerTab={innerTab}
            onApply={(filters) => {
              onApplyFilters(filters);

            }}
            setShowFilters={setShowFilters}
            showFilters={showFilters}
            nowactiveFilter={filter}
            isFilterVisible={isFilterVisible}
            setFilterVisible={setFilterVisible}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            another={another}
            setAnother={setAnother}
          />}
            )}
          {selectedFilters.length>0 && <button className='addfilterbutton'>+ Add Filter</button>}

      </div>
      <div className='pt-20 flex items-center table-left'>

      
                { showSearchbar && (
                  <div className='searchbarfilter'>
                    <Input
                      value={searchQuery}
                      onChange={(e) => {
                      setSearchQuery(e?.target?.value);
                      throttleSearch?.(e?.target?.value);
                    }}
                      placeholder="Search"
                      prefix={prefix}
                      suffix={
                        searchQuery && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              onSearch('')
                              setSearchQuery('');
                            }}
                            className="flex cursor-pointer"
                          >
                            {imagesUrl.icons.cancelWhite}
                          </div>
                        )
                      }
                      className="input-search-box"
                     />
                  </div>
                )}
                      <div className='searchicon' onClick={()=>setShowSearchbar(!showSearchbar)}><SearchIcon/></div>
        {showFilter && (

           
            <Dropdown overlay={menu} trigger={["click"]}>
              <a onClick={() => {console.log(menu)}} className="ant-dropdown-link">
              <Space>
               
                <FilterIcon2 className='filtericon'/>
            {/* <SearchIcon /> <DownOutlined /> */}
             </Space>
              </a>
            </Dropdown>
          )} 
      </div>
     
      

    </div>
    {(innerTab==='articles' || innerTab === 'experiences' || innerTab=='channels') &&
    <div className='color_information'>
          <span className='firstspan'>BASIC INFORMATION</span>
          <span><span className='author_dot'></span>&nbsp;AUTHOR TYPE</span>
          <span><span className='city_dot'></span>&nbsp;CITY</span>
          <span><span className='tag_dot'></span>&nbsp;TAGS</span>
          
        </div>
}
    </div>
  );
};

const prefix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: '#7f8285',
    }}
  />
);
const mapStateToProps = ({
  categories,
  news,
  cities,
  tags,
  collections,
  experiences,
  states,
  articles,
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

const mapDispatchToProps = (dispatch) => null;
export default connect(mapStateToProps, mapDispatchToProps)(TableToolbar);

 {/* <div className='pl-40 pr-40 pb-10 sub-nav'>
        
        <div className='sub-nav-left'>
          <div className='sub-nav-left-item1'>All 6000</div>
          <div className='sub-nav-left-item2'>Active 248</div>
          <div className='sub-nav-left-item3'>InActive 798</div>
        </div>
        <div className='sub-nav-right'>
          <Button
            onClick={onClickAdd}
            type="primary"
            style={{
              margin: 10,
              
            }}
            className={["square-button-another"]}
          >
          + Add {ctaLabel}
          </Button> 
        </div>
        <line className='sub-nav-line'></line>
      </div> */}

            // <Tooltip title={'Filter'}>
            //   <div
            //     onClick={() => {
            //         setFilterVisible(true);
            //       setActiveTool(TOOLS.FILTERS);
            //     }}
            //     className={[
            //       'square-button',
            //       isFilterActive() ? 'active' : '',
            //     ].join(' ')}
            //   >
            //     <FilterIcon />
            //     {isFilterActive() && <div className={'filter-dot'} />}
            //   </div>
            // </Tooltip>
            {/* //TODOS: uncomment this */}
        {/* {showSearch && ( */}
          {/* <div className="flex flex-row searchbar">
            <Input
              // size="large"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e?.target?.value);
                throttleSearch?.(e?.target?.value);
              }}
              placeholder="Search"
              prefix={prefix}
              suffix={
                searchQuery && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onSearch('')
                      setSearchQuery('');
                    }}
                    className="flex cursor-pointer"
                  >
                    {imagesUrl.icons.cancelWhite}
                  </div>
                )
              }
              className="input-search-box"
            />
          </div> */}
        
        {/* <div
          className={['button-group', isFilterActive() ? 'active' : ''].join(
            ' '
          )}
        > */}

           

          {/* <Tooltip title={'Coming soon..'}>
            <div
              onClick={() => {
                return;
                exportAsExcel(
                  'xlsx',
                  `${ctaLabel}_${moment().format('DD/MM/YY')}`
                );
                // setActiveTool(TOOLS.EXPORT_DATA);
              }}
              className={'square-button coming-soon'}
            >
              <UploadIcon />
            </div>
          </Tooltip> */}
          {/* <Button
            onClick={onClickAdd}
            type="primary"
            style={{
              margin: 10,
              
            }}
            className={["square-button-another"]}
          >
          + Add {ctaLabel}
          </Button>

        {/* <Dropdown className='button342' arrow>All Users </Dropdown> */}
          {/* <Dropdown arrow trigger={'click'} className="drop" ><button className='button342'>All Status </button></Dropdown>
          <button className='button342'>All Status </button> */}
          {/* <div className='dropdowns'>

          <SearchIcon />
          <FilterIcon2 />
         
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
             Sort By <DownOutlined />
              </a>
            </Dropdown>
  
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
              Select <DownOutlined />
              </a>
            </Dropdown>
          </div> */}
        {/* </div> */}