import { Layout, Skeleton, Table } from 'antd';

import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import AppHeader from '../../components/Header';
import '../common.scss';
import {
  CATEGORY_SCHEMA,
  getCategoryInitialValues,
  getTagInitialValues,
  TAG_SCHEMA,
} from './validate';
import TableToolbar from '../../components/TableToolbar';
import InnerHeader from '../../components/InnerHeader';
import { CustomPagination } from '../../components/CustomPagination';
import { getColumns, INNER_HEADERS, TABS } from './utils';
import { generateFilterUrl, getActiveTabLabel } from '../../utils/helper';
import AddCategoryForm from '../../forms/AddCategoryForm';
import AddTagForm from '../../forms/AddTagForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { COLUMN_ACTIONS } from '../../constants/dummyData';
import * as RootActions from '../../store/root/actions';

const { Header, Content } = Layout;
const Categories = (props) => {
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [innerTab, setInnerTab] = useState(TABS.CATEGORIES);
  const [sortColumn, setSortColumn] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState({});
  const [activeRow, setActiveRow] = useState({});

  useEffect(() => {
    //set data according to inner tab selected
    fetchData(innerTab, getDataFromRedux('filters'), true);
    setSortColumn('createdAt');
    setInitialValues();
  }, [innerTab]);

  const setInitialValues = () => {
    let values =
      innerTab === TABS.CATEGORIES
        ? getCategoryInitialValues()
        : getTagInitialValues();
    setFormInitialValues(values);
  };
  const fetchData = (innerTab, payload, updateReadonlyList) => {
    let filters;
    if (payload && payload.filters) filters = payload.filters;
    else filters = { ...getDataFromRedux('filters') };
    let urlParams = generateFilterUrl(filters);
    props.fetchDataForInnerTabs(innerTab, urlParams, updateReadonlyList);
  };

  const handleSort = (sortOrder, sortKey) => {
    let sortParams = {
      sort: sortKey,
      sortBy: sortOrder,
    };
    applyFilters(sortParams);
    setSortColumn(sortKey);
  };

  useEffect(() => {
    if (formModalVisible && !isEditing) {
      //reset formData when Add modal opens
      setInitialValues({});
    }
  }, [formModalVisible]);

  const getDataFromRedux = useCallback(
    (key = 'list') => {
      //here the `key` argument should match with the store's data key
      switch (innerTab) {
        case TABS.CATEGORIES:
          return props.categories?.[key];
        case TABS.TAGS:
          return props.tags?.[key];
      }
    },
    [props.categories, props.tags, innerTab]
  );
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
  const handleSearch = (query) => {
    applyFilters({ search: query });
  };
  const handleFilters = (filters) => {
    applyFilters(filters, false);
  };
  let totalDataCount = getDataFromRedux('metadata')?.total,
    currentPage = getDataFromRedux('metadata')?.currentPage;

  return (
    <div className="wrapper">
      <Layout>
        <Header
          style={{ position: 'sticky', zIndex: 99, top: 0, width: '100%' }}
        >
          <AppHeader />
          <InnerHeader
            data={INNER_HEADERS}
            activeCount={totalDataCount}
            onclick={setInnerTab}
          />
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px' }}>
          <Layout>
            <Layout className="site-layout">
              <Content style={{ overflow: 'initial' }}>
                <TableToolbar
                  innerTab={innerTab}
                  query={getDataFromRedux('filters')?.search}
                  onSearch={handleSearch}
                  onApplyFilters={handleFilters}
                  ctaLabel={getActiveTabLabel(INNER_HEADERS, innerTab)}
                  onClickAdd={() => setFormModalVisible(true)}
                  showFilter={true}
                />
                <div className="container pl-40 pr-40">
                  <Table
                    className={'is_editable'}
                    columns={getColumns(
                      innerTab,
                      handleSort,
                      sortColumn,
                      async (actionType, rowId, value) => {
                        switch (actionType) {
                          case COLUMN_ACTIONS.TOGGLE_STATUS:
                            let request = await props.updateData(
                              innerTab,
                              rowId,
                              { isActive: value }
                            );
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
                          let values =
                            innerTab === TABS.CATEGORIES
                              ? getCategoryInitialValues({
                                  ...record,
                                  colorCode: {
                                    hex: record?.colorCode,
                                  },
                                })
                              : getTagInitialValues(record);
                          setIsEditing(true);
                          setFormModalVisible(true);
                          setFormInitialValues(values);
                          setActiveRow(record);
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
                      let payload = {};
                      if (innerTab === TABS.CATEGORIES) {
                        payload = {
                          name: values.categoryName,
                          colorCode: values.colorCode?.hex,
                          image: values.image,
                          shortDescription: values.shortDescription,
                        };
                      } else {
                        payload = {
                          name: values.tagName,
                          category: values?.category,
                          shortDescription: values.shortDescription,
                        };
                      }
                      let request = {};

                      if (isEditing)
                        request = props.updateData(
                          innerTab,
                          activeRow.id,
                          payload
                        );
                      else request = props.createData(innerTab, payload);
                      request
                        .then((res) => {
                          setSortColumn(null);
                          handlePageChange(isEditing ? getDataFromRedux('metadata')?.page : 1);
                          if (!!res) {
                            setSortColumn(null);
                            setFormModalVisible(false);
                          }
                        })
                        .catch((e) => {
                          alert('ss');
                        })
                        .finally((e) => {
                          setIsEditing(false);
                          setSubmitting(false);
                        });
                    }}
                    validationSchema={
                      innerTab === TABS.CATEGORIES
                        ? CATEGORY_SCHEMA
                        : TAG_SCHEMA
                    }
                  >
                    {(rest) =>
                      innerTab === TABS.CATEGORIES ? (
                        <AddCategoryForm
                          submitBtnLabel={`${
                            isEditing ? 'Update' : 'Add'
                          } Category`}
                          {...rest}
                        />
                      ) : (
                        <AddTagForm
                          submitBtnLabel={`${isEditing ? 'Update' : 'Add'} Tag`}
                          {...rest}
                        />
                      )
                    }
                  </Formik>
                </Modal>
              </Content>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
};

Categories.propTypes = {};

const mapStateToProps = ({ categories, tags }) => ({ categories, tags });

const mapDispatchToProps = (dispatch) => ({
  fetchDataForInnerTabs: bindActionCreators(
    RootActions.fetchDataForInnerTabs,
    dispatch
  ),
  createData: bindActionCreators(RootActions.createData, dispatch),
  updateFilters: bindActionCreators(RootActions.updateFilters, dispatch),
  updateData: bindActionCreators(RootActions.updateData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
