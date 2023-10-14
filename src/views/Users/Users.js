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
import { getColumns, INNER_HEADERS, TABS } from './utils';
import { generateFilterUrl, getActiveTabLabel } from '../../utils/helper';
import AddNewStateForm from '../../forms/AddNewStateForm/AddNewStateForm';
import {
  USER_SCHEMA,
  getUserInitialValues,
} from './validate';
import { connect } from 'react-redux';
import { COLUMN_ACTIONS } from '../../constants/dummyData';
import Store from '../../store';
import can from '../../store/auth/can';
import InnerHeader from '../../components/InnerHeader';
import InitialInfo from '../../components/InitialInfo';

const { Header, Content } = Layout;
const Users = (props) => {

  const [formModalVisible, setFormModalVisible] = useState(false);
  const [innerTab, setInnerTab] = useState(TABS.USERS);
  const [sortColumn, setSortColumn] = useState('');
  const [sortedData, setSortedData] = useState([]);

  const [formInitialValues, setFormInitialValues] = useState({});
  const [activeRow, setActiveRow] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let updateReadonlyList = true;
    fetchData(innerTab, getDataFromRedux('filters'),updateReadonlyList);

    setSortColumn('createdAt');
    setInitialValues();

  }, [innerTab]);

  const setInitialValues = () => {
    let values = getUserInitialValues();
          setFormInitialValues(values);
  };

  const fetchData = async(innerTab, payload, updateReadonlyList) => {
    let filters;
    if (payload && payload.filters) filters = payload.filters;
    else filters = { ...getDataFromRedux('filters') };
    let urlParams = generateFilterUrl(filters);

    props.fetchDataForInnerTabs(innerTab, urlParams,updateReadonlyList);

  };

  const handleSort = (sortOrder, sortKey) => {
    let sortParams = {
      sort: sortKey,
      sortBy: sortOrder,
    };
    applyFilters(sortParams);
    // setSortedData(sortedData);
    setSortColumn(sortKey);
  };

  const getDataFromRedux = useCallback(
    (key = 'list') => {
      //here the `key` argument should match with the store's data key
      switch (innerTab) {
        case TABS.USERS:
          return props.users?.[key];
      }
    },
    [props.users,innerTab]
  );

  const handlePageChange = (page) => {
    if (page) {
      let filterUpdates = {
        page,
      };
      applyFilters(filterUpdates);
    }
  };
  const handleSearch = (query) => {
    applyFilters({ search: query });
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

  useEffect(() => {
    if (formModalVisible && !isEditing) {
      //reset formData when Add modal opens
      setInitialValues({});
    }
  }, [formModalVisible]);

  useEffect(() => {
    console.log(getDataFromRedux('list'));
  });

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
        <InitialInfo activeDataCount = {totalDataCount} innerTab = {innerTab}/>
          <TableToolbar
            showSearch={false}
            ctaLabel={getActiveTabLabel(INNER_HEADERS, innerTab)}
            onClickAdd={() => setFormModalVisible(true)}
            showFilter={false}
            innerTab={innerTab}
              query={getDataFromRedux('filters')?.search}
              onSearch={handleSearch}

             
          />
          <div className="container pl-40 pr-40">
            <Table
              className={'is_editable'}
              columns={getColumns(
                innerTab,
                handleSort,
                sortColumn,
                 (actionType, rowId, value) => {
                  switch (actionType) {
                    case COLUMN_ACTIONS.TOGGLE_STATUS:
                      let request =  props.updateData(innerTab, rowId, {
                        isActive: value,
                      });
                  }
                }
              ).map((column) => {
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
              // onRow={(record, rowIndex) => {
              //   return {
              //     onClick: (event) => {
              //       if (innerTab === TABS.USERS) {
              //         setIsEditing(true);
              //         setFormModalVisible(true);
              //         let values = getUserInitialValues({
              //           ...record,
              //           user: record?.name,
              //         });
              //         setFormInitialValues(values);
              //         setActiveRow(record);
              //       }
              //     },
              //   };
              // }}
              dataSource={getDataFromRedux()}
              // loading={this.state.loading}
              pagination={false}
            />
            {/* <Table
                className={innerTab === TABS.USERS ? 'is_editable' : ''}
                columns={getColumns(
                  innerTab,
                  handleSort,
                  sortColumn,
                  async (actionType, rowId, value) => {
                    switch (actionType) {
                      case COLUMN_ACTIONS.TOGGLE_STATUS:
                        let request = await props.updateData(innerTab, rowId, {
                          isActive: value,
                        });
                    }
                  }
                ).map((column) => {
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
                      if (innerTab === TABS.USERS) {
                        setIsEditing(true);
                        setFormModalVisible(true);
                        let values = getUserInitialValues({
                          ...record,
                          user: record?.name,
                        });
                        setFormInitialValues(values);
                        setActiveRow(record);
                      }
                    },
                  };
                }}
                dataSource={getDataFromRedux()}
                // loading={this.state.loading}
                pagination={false}
              /> */}
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
                let payload = {};
                if (innerTab === TABS.USERS) {
                  payload = {
                    name: values.name,
                    image: values.image,
                  };
                }
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
              validationSchema= {USER_SCHEMA}
              
            >
              {(rest) =>
                  <AddNewCityForm isEditing={isEditing} {...rest} />
              }
            </Formik>
          </Modal>
        </Content>
      </Layout>
    </Content>
  </div>
);
};

Users.propTypes = {};

const mapStateToProps = ({ users }) => ({ users });

const mapDispatchToProps = (dispatch) => ({
  fetchDataForInnerTabs: bindActionCreators(
    RootActions.fetchDataForInnerTabs,
    dispatch
  ),
  createData: bindActionCreators(RootActions.createData, dispatch),
  updateFilters: bindActionCreators(RootActions.updateFilters, dispatch),
  updateData: bindActionCreators(RootActions.updateData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);