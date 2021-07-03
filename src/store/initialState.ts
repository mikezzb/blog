import { ICombinedStore } from '../interfaces';

const Store: ICombinedStore = {
  blog: {
    loading: false,
    posts: [],
    loaded: false,
  },
  user: {
    loggedIn: false,
    user: {},
  },
};

export default Store;
