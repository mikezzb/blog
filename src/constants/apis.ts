const USERS = 'users/';
const COMMENTS = 'comments/';
const BLOGS = 'blogs/';

/* FOR COMMENTS */

const COMMENT_LOAD = COMMENTS;
const COMMENT_ADD = `${COMMENTS}add`;
const COMMENT_DELETE_ALL = `${COMMENTS}deleteAll`;
const COMMENT_DELETE = `${COMMENTS}delete`;

/* FOR USERS */

const USER_LOGIN = `${USERS}login`;
const USER_CREATE = `${USERS}add`;

/* FOR BLOGS */
const BLOG_DELETE = `${BLOGS}delete`;
const BLOG_CREATE = `${BLOGS}add`;
const BLOG_UPDATE = BLOGS;
const BLOG_LOAD = BLOGS;

export {
  COMMENT_LOAD,
  COMMENT_ADD,
  COMMENT_DELETE_ALL,
  COMMENT_DELETE,
  USER_LOGIN,
  USER_CREATE,
  BLOG_DELETE,
  BLOG_CREATE,
  BLOG_UPDATE,
  BLOG_LOAD
};
