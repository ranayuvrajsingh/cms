import { Layout, Skeleton, Table } from 'antd'; 
import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import Modal from '../../components/Modal';
import AppHeader from '../../components/Header';
import AddNewCityForm from '../../forms/AddNewCityForm';
import * as RootActions from '../../store/root/actions';
// import { STATES_DATA } from '../../constants/data';
import '../common.scss';
import TableToolbar from '../../components/TableToolbar';
// import InnerHeader from '../../components/InnerHeader';
import { CustomPagination } from '../../components/CustomPagination';
import { createPayload, getColumns, INNER_HEADERS, TABS } from './utils';
import { generateFilterUrl, getActiveTabLabel } from '../../utils/helper';
import AddNewStateForm from '../../forms/AddNewStateForm/AddNewStateForm';
import AddExperienceForm from '../../forms/AddExperienceForm/AddExperienceForm';
import {
  EXPERIENCES_SCHEMA,
  getExperienceInitialValues,
} from './validate';
import { connect } from 'react-redux';
import { COLUMN_ACTIONS } from '../../constants/dummyData';
import * as RootActionCreators from '../../store/root/actions';
import Store from '../../store';
import can from '../../store/auth/can';
import InnerHeader from '../../components/InnerHeader';
import InitialInfo from '../../components/InitialInfo';
import ConfirmationPopup from '../../components/ConfirmationPopup';
import MultipleDeleteComp from '../../components/MultipleDeleteComp';

const { Header, Content } = Layout;

const getTabMedata = (innerTab) => {
  switch (innerTab) {
    case TABS.EXPERIENCES:
      return {
        form: ({ ...props }) => (
          <AddExperienceForm
            submitButtonLabel={`${
              props.isEditing ? 'Update' : 'Add'
            } Experience`}
            {...props}
          />
        ),
        formSchema: EXPERIENCES_SCHEMA,
        initialValues: (values) => getExperienceInitialValues(values),
      };
    default:
      return {
        initialValues: () => {},
        form: () => {},
      };
  }
};
const Experiences = (props) => {

  const [formModalVisible, setFormModalVisible] = useState(false);
  const [innerTab, setInnerTab] = useState(TABS.EXPERIENCES);
  const [sortColumn, setSortColumn] = useState('');
  const [sortedData, setSortedData] = useState([]);
  const [formInitialValues, setFormInitialValues] = useState({});
  const [activeRow, setActiveRow] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);
  const [currentInnerTab, setCurrentInnerTab] = useState(null);
  const [multi, setMulti ] = useState('')
  const [selectedIds, setSelectedIds] = useState([]);
  const [showDeleteFooter, setShowDeleteFooter] = useState(false);


  useEffect(() => {
    let updateReadonlyList = true;
    fetchData(innerTab, getDataFromRedux('filters'),updateReadonlyList);
    setSortColumn('createdAt');
    setInitialValues();

  }, []);

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
    props.fetchFromReduxOrNetwork('experiences', 'limit=10&page=1', updateReadonlyList);   
  }, []);

  useEffect(() => {
    if (formModalVisible && !isEditing) {
      //reset formData when Add modal opens
      setInitialValues({});
    }
  }, [formModalVisible]);
  const handleMultiSelect = () => {
    setShowConfirmationModal(false);
    setShowDeleteFooter(false);
    let filters = {};
    filters.delete__in = [...selectedIds];
    let urlParams = generateFilterUrl(filters);
    props.deleteMany(innerTab, urlParams);
  };

  const handleDelete = async() =>{
    
    let tab = currentInnerTab;
    let id = currentDeleteId;
    setShowConfirmationModal(false);      
     await props.deleteData(tab,id)
  }

  const getForms = (formikProps) => {
    return getTabMedata(innerTab).form({ ...formikProps, isEditing });
  };
  const setInitialValues = () => {
    let values = getTabMedata(innerTab).initialValues();
    setFormInitialValues(values);
  };


  const fetchData = async(innerTab, payload, updateReadonlyList) => {
    let filters;
    if (payload && payload.filters) filters = payload.filters;
    else filters = { ...getDataFromRedux('filters') };
    let urlParams = generateFilterUrl(filters);

    props.fetchDataForInnerTabs(innerTab, urlParams,updateReadonlyList);


  };
  useEffect(() => {
    //set data according to inner tab selected
    fetchData(innerTab, getDataFromRedux('filters'));
    props.updateFilters(innerTab, {});
    setSortColumn('createdAt');
    setInitialValues();
  }, [innerTab]);

  const handleSort = (sortOrder, sortKey) => {
    let sortParams = {
      sort: sortKey,
      sortBy: sortOrder,
    };
    applyFilters(sortParams);
    // setSortedData(sortedData);
    setSortColumn(sortKey);
  };

  
    const getDataFromRedux = (key = 'list') => {
      switch (innerTab) {
        case TABS.EXPERIENCES:
          return props.experiences?.[key];
        // case TABS.AUTHORS:
        //   return props.authors?.[key];
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
  const applyFilters = (updates = {}, updateReadonlyList) => {
    let apiFilters = {
      ...getDataFromRedux('filters'),
      ...updates,
    };

    props.updateFilters(innerTab, apiFilters);
    fetchData(innerTab, { filters: apiFilters }, updateReadonlyList);
  };
  let totalDataCount = getDataFromRedux('metadata')?.total,
    currentPage = getDataFromRedux('metadata')?.currentPage;

    const handleSearch = (query) => {
      applyFilters({ search: query });
    };
    const handleFilters = (filters) => { 
      applyFilters(filters);
    };




return (
  <div className="wrapper">
    <Header style={{ position: 'sticky', zIndex: 99, top: 0, width: '100%' }}>
      {/* Can component for permisssions */}
      {/* {can("update","Channel") && */}
      <AppHeader  />
      
      {/* <InnerHeader
        data={INNER_HEADERS}
        activeCount={totalDataCount}
        onclick={setInnerTab}
      /> */}
      
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px' }}>
      <Layout className="site-layout">
        <Content style={{ overflow: 'initial' }}>
        <InitialInfo activeDataCount = {totalDataCount} onClickAdd={() => setFormModalVisible(true)}/>
          {/* <TableToolbar
            showSearch={false}
            ctaLabel={getActiveTabLabel(INNER_HEADERS, innerTab)}
            onClickAdd={() => setFormModalVisible(true)}
            showFilter={false}
          /> */}
           <TableToolbar
              innerTab={innerTab}
              query={getDataFromRedux('filters')?.search}
              onSearch={handleSearch}
              onApplyFilters={handleFilters}
              ctaLabel={getActiveTabLabel(INNER_HEADERS, innerTab)}
              
              showFilter={innerTab === 'authors' ? false : true}
            />
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
              // loading={this.state.loading}
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
            width="500px"
            title={
              <p className="flex items-center color-black weight-700 size-26">
                {isEditing ? 'Edit' : 'Add'}{' '}
                {getActiveTabLabel(INNER_HEADERS, innerTab)}
              </p>
            }
            destroyOnClose
            onCancel={() => {
              setIsEditing(false);
              setFormModalVisible(false);
            }}
            visible={formModalVisible}
          >
            <Formik
              enableReinitialize
              initialValues={formInitialValues}
              onSubmit={(values, { setSubmitting, validateForm }) => {
                  let payload = createPayload(innerTab, values);
                  console.log('payload in exp forms', payload)
                  let request;
                  if (isEditing)
                    request = props.updateData(innerTab, activeRow.id, payload);
                  else request = props.createData(innerTab, payload);


                request
                  .then((res) => {
                    setSortColumn(null);
                    handlePageChange(isEditing ? getDataFromRedux('metadata')?.page : 1);
                    setFormModalVisible(false);
                  })
                  .catch((e) => {
                    alert('ss');
                  })
                  .finally((e) => {
                    setIsEditing(false);
                    setSubmitting(false);
                  });
              }}
              validationSchema= {EXPERIENCES_SCHEMA}
              
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

Experiences.propTypes = {};

const mapStateToProps = ({ experiences, classification }) => ({ experiences, classification });

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

export default connect(mapStateToProps, mapDispatchToProps)(Experiences);