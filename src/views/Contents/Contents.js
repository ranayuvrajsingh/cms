import { Button, Checkbox, Layout, Skeleton, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import AppHeader from '../../components/Header';
import '../common.scss';
import InnerHeader from '../../components/InnerHeader';
import { createPayload, getColumns, INNER_HEADERS, TABS } from './utils';
import TableToolbar from '../../components/TableToolbar';
import { generateFilterUrl, getActiveTabLabel } from '../../utils/helper';
import { CustomPagination } from '../../components/CustomPagination';
import Modal from '../../components/Modal';
import { Formik } from 'formik';
import AddArticlesForm from '../../forms/AddArticlesForm';

import {
  ARTICLES_SCHEMA,
  // AUTHORS_SCHEMA,
  CHANNELS_SCHEMA,
  // EXPERIENCES_SCHEMA,
  getArticlesInitialValues,
  // getAuthorsInitialValues,
  getChannelInitialValues,
  // getExperienceInitialValues,
} from './validate';
import AddCollectionForm from '../../forms/AddCollectionForm';
// import AddExperienceForm from '../../forms/AddExperienceForm/AddExperienceForm';
// import AddAuthorsForm from '../../forms/AddAuthorsForm';
import { bindActionCreators } from 'redux';
import * as RootActionCreators from '../../store/root/actions';
import * as RootActions from '../../store/root/actions';
import { connect } from 'react-redux';
import { COLUMN_ACTIONS } from '../../constants/dummyData';
import CategoryHeader from '../../components/CategoryHeader';
import InitialInfo from '../../components/InitialInfo';
import ConfirmationModal from '../../components/ConfirmationPopup';
import ConfirmationPopup from '../../components/ConfirmationPopup';
import { filter } from 'lodash';
import AddChannelsForm from '../../forms/AddChannelsForm/AddChannelsForm';
import can from '../../store/auth/can';
import MultipleDeleteComp from '../../components/MultipleDeleteComp';

const { Header, Content } = Layout;



const getTabMedata = (innerTab) => {
  switch (innerTab) {
    case TABS.ARTICLES:
      return {
        form: ({ ...props }) => (
          <AddArticlesForm
            submitButtonLabel={`${props.isEditing ? 'Update' : 'Add'} Article`}
            {...props}
          />
        ),
        formSchema: ARTICLES_SCHEMA,
        initialValues: (values) => getArticlesInitialValues(values),
      };
    case TABS.CHANNELS:
      return {
        form: ({ ...props }) => (
          <AddChannelsForm
            submitButtonLabel={`${
              props.isEditing ? 'Update' : 'Add'
            } Channel`}
            {...props}
          />
        ),
        formSchema: CHANNELS_SCHEMA,
        initialValues: (values) => getChannelInitialValues(values),
      };
    // case TABS.EXPERIENCES:
    //   return {
    //     form: ({ ...props }) => (
    //       <AddExperienceForm
    //         submitButtonLabel={`${
    //           props.isEditing ? 'Update' : 'Add'
    //         } Experience`}
    //         {...props}
    //       />
    //     ),
    //     formSchema: EXPERIENCES_SCHEMA,
    //     initialValues: (values) => getExperienceInitialValues(values),
    //   };
    // case TABS.AUTHORS:
    //   return {
    //     form: ({ ...props }) => (
    //       <AddAuthorsForm
    //         submitButtonLabel={`${props.isEditing ? 'Update' : 'Add'} Author`}
    //         {...props}
    //       />
    //     ),
    //     formSchema: AUTHORS_SCHEMA,
    //     initialValues: (values) => getAuthorsInitialValues(values),
    //   };

    default:
      return {
        initialValues: () => {},
        form: () => {},
      };
  }
};
const Contents = (props) => {
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [innerTab, setInnerTab] = useState(TABS.ARTICLES);
  const [sortColumn, setSortColumn] = useState('');

  const [formInitialValues, setFormInitialValues] = useState({});
  const [activeRow, setActiveRow] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showDeleteFooter, setShowDeleteFooter] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);
  const [currentInnerTab, setCurrentInnerTab] = useState(null);
  const [multi, setMulti ] = useState('')
                        
  const getForms = (formikProps) => {
    return getTabMedata(innerTab).form({ ...formikProps, isEditing });
  };
  const setInitialValues = () => {
    let values = getTabMedata(innerTab).initialValues();
    setFormInitialValues(values);
  };
  useEffect(() => { 
    if(selectedIds.length ==0){
      setShowDeleteFooter(false)
    }
    if(selectedIds.length >0) {
    setShowDeleteFooter(true)

    }
  }, [selectedIds.length]);


  useEffect(() => {
    let updateReadonlyList = true;
    props.fetchFromReduxOrNetwork('articles', 'limit=10&page=1', updateReadonlyList);
    props.fetchFromReduxOrNetwork('cities','limit=10&page=1', updateReadonlyList)
    props.fetchFromReduxOrNetwork('tags','limit=10&page=1', updateReadonlyList)
   
  }, []);


  useEffect(() => {
    //set data according to inner tab selected
    fetchData(innerTab, getDataFromRedux('filters'));
    props.updateFilters(innerTab, {});
    setSortColumn('createdAt');
    setInitialValues();
  }, [innerTab]);

  useEffect(() => {
    if (formModalVisible && !isEditing) {
      //reset formData when Add modal opens
      setInitialValues({});
    }
  }, [formModalVisible]);

  const fetchData = (innerTab, payload) => {
    let filters;

    if (payload && payload.filters) filters = payload.filters;
    else filters = { ...getDataFromRedux('filters') };
    let urlParams = generateFilterUrl(filters);

    props.fetchDataForInnerTabs(innerTab, urlParams);
  };

  const getDataFromRedux = (key = 'list') => {
    switch (innerTab) {
      case TABS.ARTICLES:
        return props.articles?.[key];
      case TABS.CHANNELS:
        return props.channels?.[key];
      // case TABS.EXPERIENCES:
      //   return props.experiences?.[key];
      // case TABS.AUTHORS:
      //   return props.authors?.[key];
    }
  };

  useEffect(()=> {
    console.log('again')
  },[selectedIds.length])

  const handleSort = (sortOrder, sortKey) => {
    let sortParams = {
      sort: sortKey,
      sortBy: sortOrder,
    };
    applyFilters(sortParams);
    setSortColumn(sortKey);
  };

  const handleDelete = async() =>{
    
    let tab = currentInnerTab;
    let id = currentDeleteId;
    setShowConfirmationModal(false);      
     await props.deleteData(tab,id)
  }
  const handleFormModal =()=> {
    if(selectedIds.length==0){
      setFormModalVisible(true);
    }
    else{
      setShowConfirmationModal(false)
    }
  };
  const handlePageChange = (page) => {
    if (page) {
      let filterUpdates = {
        page,
      };
      applyFilters(filterUpdates);
    }
  };
  const applyFilters = (updates = {}) => {
    let apiFilters = {
      ...getDataFromRedux('filters'),
      ...updates,
    };
    props.updateFilters(innerTab, apiFilters);
    fetchData(innerTab, { filters: apiFilters });
  };

  const handleMultiSelect = () => {
    setShowConfirmationModal(false);
    setShowDeleteFooter(false);
    let filters = {};
    filters.delete__in = [...selectedIds];
    let urlParams = generateFilterUrl(filters);
    props.deleteMany(innerTab, urlParams);
    // window.location.reload();
  };
  const handleSearch = (query) => {
    applyFilters({ search: query });
  };
  const handleFilters = (filters) => {
    applyFilters(filters);
  };
  let totalDataCount = getDataFromRedux('metadata')?.total,
    currentPage = getDataFromRedux('metadata')?.currentPage;

    console.log('selectedIds',multi, showConfirmationModal)
  return (
    <div className="wrapper">
      
      <Header style={{ position: 'sticky', zIndex: 99, top: 0, width: '100%' }}>
      
        <AppHeader />
       
        <InnerHeader
          data={INNER_HEADERS}
          activeCount={totalDataCount}
          onclick={setInnerTab}
        />
             
      </Header>
      
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        <Layout className="site-layout">
          <Content style={{ overflow: 'initial' }}>
          <InitialInfo  onClickAdd={() => setFormModalVisible(true)}/>
            <TableToolbar
              innerTab={innerTab}
              query={getDataFromRedux('filters')?.search}
              onSearch={handleSearch}
              onApplyFilters={handleFilters}
              ctaLabel={getActiveTabLabel(INNER_HEADERS, innerTab)}
              onClickAdd={() => setFormModalVisible(true)}
              showFilter={innerTab === 'authors' ? false : true}
            />
                       
            {/* <CategoryHeader
              activeFilters={getDataFromRedux('filters')}
              data={props.categories}
              innerTab={innerTab}
              activeCount={totalDataCount}
              onclick={setInnerTab}
              onApplyFilters={handleFilters}
              showCategoryHeaders={innerTab === 'authors' ? false : true}
            /> */}

            <div className="container pl-40 pr-40">

              <Table
                className={'is_editable'}
                columns={
                  getColumns(
                  innerTab,
                  handleSort,
                  sortColumn,
                  setSelectedIds,
                  selectedIds,
                  // setMulti,
                  async (actionType, rowId, value) => {
  
                    switch (actionType) {
                      case COLUMN_ACTIONS.TOGGLE_STATUS:
                         await props.updateData(innerTab, rowId, {
                          isFeatured: value,
                        });
                      break;
                      case COLUMN_ACTIONS.APP:
                        await props.updateData(innerTab, rowId, {
                          inApp: value,
                        });
                        break;
                      case COLUMN_ACTIONS.WEB:
                         await props.updateData(innerTab, rowId, {
                          inWeb: value,
                        });
                        break;
                      case COLUMN_ACTIONS.DELETE:
                         setShowConfirmationModal(true);
                         setCurrentDeleteId(rowId);
                         setCurrentInnerTab(innerTab);
                         setMulti('single');
                    }
                  }
                )?.map((column) => {
                  return {
                    ...column,
                    ...(props.loading && {
                      render: () => (
                        <Checkbox  />,
                        <Skeleton
                          key={column.dataIndex}
                          title={true}
                          paragraph={false}
                        />
                      ),
                    }),
                  };
                })}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      setFormModalVisible(selectedIds.length == 0 ? true : false);
                      setTimeout(()=>{
                      let values = getTabMedata(innerTab).initialValues(record);
                      setIsEditing(true);
                      setFormInitialValues(values);
                      setActiveRow(record);
                      },300)
                    },
                  };
                }}
                dataSource={getDataFromRedux()}
                pagination={false}
              />
              <CustomPagination
                current={currentPage}
                totalCount={totalDataCount}
                defaultCurrent={1}
                onChange={handlePageChange}
                pageSize={10}
              />

        
            </div>

            <Modal
              width="620px"
              title={
                <p className="flex items-center color-black weight-700 size-26">
                  {isEditing ? 'Edit' : 'Add'}{' '}
                  {getActiveTabLabel(INNER_HEADERS, innerTab)}
                </p>
              }
              destroyOnClose
              onCancel={() => {
                setInitialValues({});
                setIsEditing(false);
                setFormModalVisible(false);
              }}
              visible={formModalVisible}
            >

              <Formik
                enableReinitialize
                preserve={false}
                initialValues={formInitialValues}
                onSubmit={(
                  values,
                  { setSubmitting, validateForm, resetForm }
                ) => {

                  let payload = createPayload(innerTab, values);
                  console.log(payload);
                  let request;
                  if (isEditing)
                    request = props.updateData(innerTab, activeRow.id, payload);
                  else request = props.createData(innerTab, payload);

                  request
                    .then((res) => {
                      if (!!res) {
                        setSortColumn(null);
                        handlePageChange(
                          isEditing ? getDataFromRedux('metadata')?.page : 1
                        );
                        setFormModalVisible(false);
                        setIsEditing(false);
                      }
                    })
                    .catch((e) => {
                      alert('ss');
                    })
                    .finally((e) => {
                      setSubmitting(false);
                    });
                }}
                validationSchema={getTabMedata(innerTab).formSchema}
              >
                {getForms}
              </Formik>
             
            </Modal>
            {showDeleteFooter && 
        // <div><Button onClick={()=>{setMulti('many'); setShowConfirmationModal(true)}}>Delete</Button></div>
      
            <MultipleDeleteComp setMulti={setMulti} setShowConfirmationModal={setShowConfirmationModal} />
}
           {showConfirmationModal &&
          <ConfirmationPopup visible={showConfirmationModal}
           multi= {multi}
           handleMultiSelect = {handleMultiSelect}
           handleDelete = {handleDelete}
            setShowConfirmationModal={setShowConfirmationModal}><span>sure you want to delete</span> </ConfirmationPopup>
            }
            </Content>
        </Layout>
      </Content>
    </div>
  );
};
const mapStateToProps = ({
  articles,
  channels,
  // experiences,
  states,
  tags,
  // categories,
  // authors,
}) => ({
  states,
  channels,
  tags,
  // experiences,
  articles,
  // authors,
  // categories:
  //   categories?.readonlyList?.length === 0
  //     ? categories?.list
  //     : categories?.readonlyList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDataForInnerTabs: bindActionCreators(
    RootActionCreators.fetchDataForInnerTabs,
    dispatch
  ),
  fetchFromReduxOrNetwork: bindActionCreators(
    RootActions.fetchFromReduxOrNetwork,
    dispatch
  ),

  createData: bindActionCreators(RootActionCreators.createData, dispatch),
  updateData: bindActionCreators(RootActionCreators.updateData, dispatch),
  updateFilters: bindActionCreators(RootActionCreators.updateFilters, dispatch),
  deleteData: bindActionCreators(RootActionCreators.deleteData, dispatch),
  deleteMany : bindActionCreators(RootActionCreators.deleteMany, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contents);
