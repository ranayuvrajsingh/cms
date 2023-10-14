import { Api } from '../config/request';
import * as RootActionCreators from '../../store/root/actionCreators';
/*TODO:- Create config (states,categories etc) for fetching data while creating*/

//Currently, all the EDIT API and dispatch gets called from cities/actions.
//Thinking of moving everything to same source (only keeping the reducer different) in future, as most of the code is redundant.
export const GetApis = {
  common: {
    createImage: (payload) => Api.postRequest('multimedias', payload),
  },
  cities: {
    get: {
      data: (params = '') => Api.getRequest(`cities/?${params}`),
      dispatch: (payload,updateReadonlyList) => 
      RootActionCreators.setData(payload, 'cities',updateReadonlyList),
    },
    create: {
      data: (payload) => Api.postRequest('cities', payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'cities'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`cities/${id}`, payload),
      dispatch: (payload) => RootActionCreators.updateData(payload, 'cities'),
    },
    delete: {
      data: (id) => Api.deleteRequest(`cities/${id}`),
      dispatch: (payload) => RootActionCreators.deleteData(payload, 'cities'),
    },
    deleteMany: {
      data: (params = '') => Api.deleteRequest(`cities/?${params}`),
      dispatch: (payload) => RootActionCreators.deleteMany(payload, 'cities'),
    },
    filters: {
      dispatch: (payload) =>
        RootActionCreators.updateFilters(payload, 'cities'),
    },
  },
  states: {
    get: {
      data: (params = '') => Api.getRequest(`states/?${params}`),
      dispatch: (payload) => RootActionCreators.setData(payload, 'states'),
    },
    create: {
      data: (payload) => Api.postRequest('states', payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'states'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`states/${id}`, payload),
      dispatch: (payload) => RootActionCreators.updateData(payload, 'states'),
    },
    delete: {
      data: (id) => Api.deleteRequest(`states/${id}`),
      dispatch: (payload) => RootActionCreators.deleteData(payload, 'states'),
    },
    deleteMany: {
      data: (params = '') => Api.deleteRequest(`states/?${params}`),
      dispatch: (payload) => RootActionCreators.deleteMany(payload, 'states'),
    },
    filters: {
      dispatch: (payload) =>
        RootActionCreators.updateFilters(payload, 'states'),
    },
  },
  articles: {
    get: {
      data: (params = '') => Api.getRequest(`articles/?${params}`),
      dispatch: (payload) => RootActionCreators.setData(payload, 'articles'),
    },
    create: {
      data: (payload) => Api.postRequest('articles', payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'articles'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`articles/${id}`, payload),
      dispatch: (payload) => RootActionCreators.updateData(payload, 'articles'),
    },
    delete: {
      data: (id) => Api.deleteRequest(`articles/${id}`),
      dispatch: (payload) => RootActionCreators.deleteData(payload, 'articles'),
    },
    deleteMany: {
      data: (params = '') => Api.deleteRequest(`articles/?${params}`),
      dispatch: (payload) => RootActionCreators.deleteMany(payload, 'articles'),
    },
    filters: {
      dispatch: (payload) =>
        RootActionCreators.updateFilters(payload, 'articles'),
    },
  },
  // collections: {
  //   get: {
  //     data: (params = '') => Api.getRequest(`collections/?${params}`),
  //     dispatch: (payload) => RootActionCreators.setData(payload, 'collections'),
  //   },
  //   create: {
  //     data: (payload) => Api.postRequest('collections', payload),
  //     dispatch: (payload) => RootActionCreators.addData(payload, 'collections'),
  //   },
  //   edit: {
  //     data: (id, payload) => Api.putRequest(`collections/${id}`, payload),
  //     dispatch: (payload) =>
  //       RootActionCreators.updateData(payload, 'collections'),
  //   },
  //   filters: {
  //     dispatch: (payload) =>
  //       RootActionCreators.updateFilters(payload, 'collections'),
  //   },
  // },

  channels: {
    get: {
      data: (params = '') => Api.getRequest(`channels/?${params}`),
      dispatch: (payload) => RootActionCreators.setData(payload, 'channels'),
    },
    create: {
      data: (payload) => Api.postRequest('channels', payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'channels'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`channels/${id}`, payload),
      dispatch: (payload) =>
        RootActionCreators.updateData(payload, 'channels'),
    },
    delete: {
      data: (id) => Api.deleteRequest(`channels/${id}`),
      dispatch: (payload) => RootActionCreators.deleteData(payload, 'channels'),
    },
    deleteMany: {
      data: (params = '') => Api.deleteRequest(`channels/?${params}`),
      dispatch: (payload) => RootActionCreators.deleteMany(payload, 'channels'),
    },
    filters: {
      dispatch: (payload) =>
        RootActionCreators.updateFilters(payload, 'channels'),
    },
  },
  experiences: {
    get: {
      data: (params = '') => Api.getRequest(`experiences/?${params}`),
      dispatch: (payload) => RootActionCreators.setData(payload, 'experiences'),
    },
    create: {
      data: (payload) => Api.postRequest('experiences', payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'experiences'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`experiences/${id}`, payload),
      dispatch: (payload) =>
        RootActionCreators.updateData(payload, 'experiences'),
    },
    delete: {
      data: (id) => Api.deleteRequest(`experiences/${id}`),
      dispatch: (payload) => RootActionCreators.deleteData(payload, 'experiences'),
    },
    deleteMany: {
      data: (params = '') => Api.deleteRequest(`experiences/?${params}`),
      dispatch: (payload) => RootActionCreators.deleteMany(payload, 'experiences'),
    },
    filters: {
      dispatch: (payload) =>
        RootActionCreators.updateFilters(payload, 'experiences'),
    },
  },
  // categories: {
  //   get: {
  //     data: (params = '') => Api.getRequest(`categories/?${params}`),
  //     dispatch: (payload, updateReadonlyList) =>
  //       RootActionCreators.setData(payload, 'categories', updateReadonlyList),
  //   },
  //   create: {
  //     data: (payload) => Api.postRequest('categories', payload),
  //     dispatch: (payload) => RootActionCreators.addData(payload, 'categories'),
  //   },
  //   edit: {
  //     data: (id, payload) => Api.putRequest(`categories/${id}`, payload),
  //     dispatch: (payload) =>
  //       RootActionCreators.updateData(payload, 'categories'),
  //   },
  //   filters: {
  //     dispatch: (payload) =>
  //       RootActionCreators.updateFilters(payload, 'categories'),
  //   },
  // },

  authors:{
    get: {
      data: (params = '') => Api.getRequest(`authors/?${params}`),
      dispatch: (payload) => RootActionCreators.setData(payload, 'authors'),
    },
    create: {
      data: (payload) => Api.postRequest('authors',payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'authors'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`authors/${id}`, payload),
      dispatch: (payload) => RootActionCreators.updateData(payload, 'authors'),
    },

  },

  users: {
    get: {
      data: (params = '') => Api.getRequest(`users/?${params}`),
      dispatch: (payload,updateReadonlyList) => 
      RootActionCreators.setData(payload, 'users',updateReadonlyList),
    },
    create: {
      data: (payload) => Api.postRequest('users', payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'users'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`users/${id}`, payload),
      dispatch: (payload) => RootActionCreators.updateData(payload, 'users'),
    },
    filters: {
      dispatch: (payload) =>
        RootActionCreators.updateFilters(payload, 'users'),
    },
  },

  admins: {
    get: {
      data: (params = '') => Api.getRequest(`admins/?${params}`),
      dispatch: (payload,updateReadonlyList) => 
      RootActionCreators.setData(payload, 'admins',updateReadonlyList),
    },
    create: {
      data: (payload) => Api.postRequest('admins', payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'admins'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`admins/${id}`, payload),
      dispatch: (payload) => RootActionCreators.updateData(payload, 'admins'),
    },
    filters: {
      dispatch: (payload) =>
        RootActionCreators.updateFilters(payload, 'admins'),
    },
    delete: {
      data: (id) => Api.deleteRequest(`admins/${id}`),
      dispatch: (payload) => RootActionCreators.deleteData(payload, 'admins'),
    },
    
  },
  tags: {
    get: {
      data: (params = '') => Api.getRequest(`tags/?${params}`),
      dispatch: (payload,updateReadonlyList) => 
      RootActionCreators.setData(payload, 'tags',updateReadonlyList),
    },
    create: {
      data: (payload) => Api.postRequest('tags', payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'tags'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`tags/${id}`, payload),
      dispatch: (payload) => RootActionCreators.updateData(payload, 'tags'),
    },
    delete: {
      data: (id) => Api.deleteRequest(`tags/${id}`),
      dispatch: (payload) => RootActionCreators.deleteData(payload, 'tags'),
    },
    deleteMany: {
      data: (params = '') => Api.deleteRequest(`tags/?${params}`),
      dispatch: (payload) => RootActionCreators.deleteMany(payload, 'tags'),
    },
    filters: {
      dispatch: (payload) => RootActionCreators.updateFilters(payload, 'tags'),
    },
  },
  roles: {
    get: {
      data: (params = '') => Api.getRequest(`roles/?${params}`),
      dispatch: (payload) => RootActionCreators.setData(payload, 'roles'),
    },
    create: {
      data: (payload) => Api.postRequest('roles', payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'roles'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`roles/${id}`, payload),
      dispatch: (payload) => RootActionCreators.updateData(payload, 'roles'),
    },
    delete: {
      data: (id) => Api.deleteRequest(`roles/${id}`),
      dispatch: (payload) => RootActionCreators.deleteData(payload, 'roles'),
    },
    deleteMany: {
      data: (params = '') => Api.deleteRequest(`roles/?${params}`),
      dispatch: (payload) => RootActionCreators.deleteMany(payload, 'roles'),
    },
    filters: {
      dispatch: (payload) => RootActionCreators.updateFilters(payload, 'roles'),
    },
  },
  weathers: {
    get: {
      data: (params = '') => Api.getRequest(`weathers/?${params}`),
      dispatch: (payload) => RootActionCreators.setData(payload, 'weathers'),
    },
    create: {
      data: (payload) => Api.postRequest('weathers', payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'weathers'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`weathers/${id}`, payload),
      dispatch: (payload) => RootActionCreators.updateData(payload, 'weathers'),
    },
    delete: {
      data: (id) => Api.deleteRequest(`weathers/${id}`),
      dispatch: (payload) => RootActionCreators.deleteData(payload, 'weathers'),
    },
    deleteMany: {
      data: (params = '') => Api.deleteRequest(`weathers/?${params}`),
      dispatch: (payload) => RootActionCreators.deleteMany(payload, 'weathers'),
    },
    filters: {
      dispatch: (payload) => RootActionCreators.updateFilters(payload, 'weathers'),
    },
  },
  dailynews: {
    get: {
      data: (params = '') => Api.getRequest(`dailynews/?${params}`),
      dispatch: (payload) => RootActionCreators.setData(payload, 'dailynews'),
    },
    create: {
      data: (payload) => Api.postRequest('dailynews', payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'dailynews'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`dailynews/${id}`, payload),
      dispatch: (payload) => RootActionCreators.updateData(payload, 'dailynews'),
    },
    delete: {
      data: (id) => Api.deleteRequest(`dailynews/${id}`),
      dispatch: (payload) => RootActionCreators.deleteData(payload, 'dailynews'),
    },
    deleteMany: {
      data: (params = '') => Api.deleteRequest(`dailynews/?${params}`),
      dispatch: (payload) => RootActionCreators.deleteMany(payload, 'dailynews'),
    },
    filters: {
      dispatch: (payload) => RootActionCreators.updateFilters(payload, 'dailynews'),
    },
  },
  bytes: {
    get: {
      data: (params = '') => Api.getRequest(`bytes/?${params}`),
      dispatch: (payload) => RootActionCreators.setData(payload, 'bytes'),
    },
    create: {
      data: (payload) => Api.postRequest('bytes', payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'bytes'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`bytes/${id}`, payload),
      dispatch: (payload) => RootActionCreators.updateData(payload, 'bytes'),
    },
    delete: {
      data: (id) => Api.deleteRequest(`bytes/${id}`),
      dispatch: (payload) => RootActionCreators.deleteData(payload, 'bytes'),
    },
    deleteMany: {
      data: (params = '') => Api.deleteRequest(`bytes/?${params}`),
      dispatch: (payload) => RootActionCreators.deleteMany(payload, 'bytes'),
    },
    filters: {
      dispatch: (payload) => RootActionCreators.updateFilters(payload, 'bytes'),
    },
  },
  medium: {
    get: {
      data: (params = '') => Api.getRequest(`medium/?${params}`),
      dispatch: (payload,updateReadonlyList) => 
      RootActionCreators.setData(payload, 'medium',updateReadonlyList),
    },
    create: {
      data: (payload) => Api.postRequest('medium', payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'medium'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`medium/${id}`, payload),
      dispatch: (payload) => RootActionCreators.updateData(payload, 'medium'),
    },
    delete: {
      data: (id) => Api.deleteRequest(`medium/${id}`),
      dispatch: (payload) => RootActionCreators.deleteData(payload, 'medium'),
    },
    deleteMany: {
      data: (params = '') => Api.deleteRequest(`medium/?${params}`),
      dispatch: (payload) => RootActionCreators.deleteMany(payload, 'medium'),
    },
    filters: {
      dispatch: (payload) =>
        RootActionCreators.updateFilters(payload, 'medium'),
    },
  },
  slot: {
    get: {
      data: (params = '') => Api.getRequest(`slot/?${params}`),
      dispatch: (payload,updateReadonlyList) => 
      RootActionCreators.setData(payload, 'slot',updateReadonlyList),
    },
    create: {
      data: (payload,params = '') => Api.postRequest(`slot/?${params}`, payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'slot'),
    },
    createMultiple:{
      data: (payload,params = '') => Api.postRequest(`slot/rec?${params}`, payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'slot'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`slot/${id}`, payload),
      dispatch: (payload) => RootActionCreators.updateData(payload, 'slot'),
    },
    delete: {
      data: (id) => Api.deleteRequest(`slot/${id}`),
      dispatch: (payload) => RootActionCreators.deleteData(payload, 'slot'),
    },
    deleteMany: {
      data: (params = '') => Api.deleteRequest(`slot/?${params}`),
      dispatch: (payload) => RootActionCreators.deleteMany(payload, 'slot'),
    },
    filters: {
      dispatch: (payload) =>
        RootActionCreators.updateFilters(payload, 'slot'),
    },
  },
  classification: {
    get: {
      data: (params = '') => Api.getRequest(`classification/?${params}`),
      dispatch: (payload,updateReadonlyList) => 
      RootActionCreators.setData(payload, 'classification',updateReadonlyList),
    },
    create: {
      data: (payload) => Api.postRequest('classification', payload),
      dispatch: (payload) => RootActionCreators.addData(payload, 'classification'),
    },
    edit: {
      data: (id, payload) => Api.putRequest(`classification/${id}`, payload),
      dispatch: (payload) => RootActionCreators.updateData(payload, 'classification'),
    },
    delete: {
      data: (id) => Api.deleteRequest(`classification/${id}`),
      dispatch: (payload) => RootActionCreators.deleteData(payload, 'classification'),
    },
    deleteMany: {
      data: (params = '') => Api.deleteRequest(`classification/?${params}`),
      dispatch: (payload) => RootActionCreators.deleteMany(payload, 'classification'),
    },
    filters: {
      dispatch: (payload) =>
        RootActionCreators.updateFilters(payload, 'classification'),
    },
  },
  permission: {
    get: {
      data: (params = '') => Api.getRequest(`permission/?${params}`),
      dispatch: (payload,updateReadonlyList) => 
      RootActionCreators.setData(payload, 'permission',updateReadonlyList),
    },
    // create: {
    //   data: (payload) => Api.postRequest('cities', payload),
    //   dispatch: (payload) => RootActionCreators.addData(payload, 'cities'),
    // },
    // edit: {
    //   data: (id, payload) => Api.putRequest(`cities/${id}`, payload),
    //   dispatch: (payload) => RootActionCreators.updateData(payload, 'cities'),
    // },
    // delete: {
    //   data: (id) => Api.deleteRequest(`cities/${id}`),
    //   dispatch: (payload) => RootActionCreators.deleteData(payload, 'cities'),
    // },
    // deleteMany: {
    //   data: (params = '') => Api.deleteRequest(`cities/?${params}`),
    //   dispatch: (payload) => RootActionCreators.deleteMany(payload, 'cities'),
    // },
    filters: {
      dispatch: (payload) =>
        RootActionCreators.updateFilters(payload, 'permission'),
    },
  },
};
