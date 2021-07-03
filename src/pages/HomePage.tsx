import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  AiFillLinkedin, AiFillGithub,
} from 'react-icons/ai';

import store, { AppDispatch, RootState } from '../store';
import loadBlog from '../store/Blog';
import { ILocation, IPost } from '../interfaces';
import useDebounce from '../utils/useDebounce';
import { BLOG_LOAD } from '../constants/apis';
import './HomePage.css';
import Block from '../components/home/Block';
import Header from '../components/Header';
import Loading from '../components/Loading';
import * as blogActions from '../store/blog/actions';
import * as userActions from '../store/user/actions';
import { INITIAL_LOADING_SKIP } from '../constants/config';
import { CATEGORIES } from '../constants';

const HomePage = (props: PropsFromRedux) => {
  const [ended, setEnded] = useState(false);
  const [displayUserIconMenu, setDisplayUserIconMenu] = useState(false);
  const [category, setCategory] = useState(CATEGORIES.INITIAL);

  const loadMore = () => {
    const skipJSON = {
      dateBefore: props.blog.posts[props.blog.posts.length - 1].createdAt,
    };

    axios.post(BLOG_LOAD, skipJSON)
      .then(res => {
        if (res.data && res.data.length) {
          props.loadBlogSuccess(res.data);
        }
        else {
          setEnded(true);
          props.allLoaded();
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  const listenToScroll = useDebounce(() => {
    const distanceFromBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight;
    if (distanceFromBottom <= 100) {
      if (!props.blog.loaded) {
        loadMore();
      }
    }
  }, 500);

  const logout = () => {
    props.logout();
    setCategory(CATEGORIES.INITIAL);
    Cookies.remove('loggedInUser');
    setDisplayUserIconMenu(false);
    alert('Logged out successfully!');
  };

  const addPostOnclick = () => {
    setDisplayUserIconMenu(false);
  };

  useEffect(() => {
    store.dispatch(loadBlog(INITIAL_LOADING_SKIP) as any);
  }, []);

  useEffect(() => {
    if (props.blog.loaded) {
      window.removeEventListener('scroll', listenToScroll);
      setEnded(true);
    }
    else if (!props.blog.loading) {
      window.addEventListener('scroll', listenToScroll);
    }
    return (() => window.removeEventListener('scroll', listenToScroll));
  }, [props.blog, listenToScroll]);

  const handleViewMyPost = () => {
    setCategory(category === CATEGORIES.MY_POST ? CATEGORIES.INITIAL : CATEGORIES.MY_POST);
    setDisplayUserIconMenu(false);
  };

  const filterPosts = (post: IPost) =>
    category === post.category || category === CATEGORIES.INITIAL || (category === CATEGORIES.MY_POST && props.user.user && props.user.user.username === post.username);

  return (
    <div>
      {
        displayUserIconMenu &&
        <div className="userMenuContainer">
          <div className="menuWrapper">
            <Link to="/edit" className="menuItem" key="Add Post" onClick={addPostOnclick}>Add Post</Link>
            <div className="menuItem" key="View My Posts" onClick={handleViewMyPost}>View My Posts</div>
            <div className="menuItem" key="Log Out" onClick={logout}>Log Out</div>
          </div>
        </div>
      }
      <Header
        updateCategory={setCategory}
        isArticleView={false}
        userIconOnclick={() => setDisplayUserIconMenu(!displayUserIconMenu)}
      />
      <div className="blockView">
        {
          props.blog.loading ?
            <Loading /> :
            (
              <>
                <div className="left blocks">
                  {
                    props.blog.posts
                      .filter(filterPosts)
                      .map((post: IPost) => (
                        <Link
                          key={post._id}
                          className="blockWrapper"
                          to={{
                            pathname: `/article/${post._id}`,
                            index: props.blog.posts.findIndex((postItem: { createdAt: any; }) => postItem.createdAt === post.createdAt),
                          } as ILocation}
                        >
                          <Block
                            category={post.category}
                            tag={post.tags}
                            date={post.createdAt}
                            icon={post.userIcon}
                            username={post.username}
                            key={post.createdAt}
                            content={post.content}
                            background={post.backgroundURL}
                            title={post.title}
                          />
                        </Link>
                      ))
                  }
                </div>
                <div className="right about">
                  <div className="center top">
                    <span className="my-icon" onClick={() => window.open('https://mikezzb.github.io/')} />
                    <div className="about text">
                      <h3>Mike</h3>
                      <p>Yet another human being</p>
                    </div>
                  </div>
                  <div className="bottom">
                    <div>
                      <AiFillGithub className="social-media" onClick={() => window.open('https://github.com/mikezzb')} />
                      <AiFillLinkedin className="social-media" onClick={() => window.open('https://www.linkedin.com/in/mikezzb')} />
                    </div>
                  </div>
                </div>
              </>
            )
        }
      </div>
      {
        ended &&
        <div className="end">-END-</div>
      }
      {
        (!ended && !props.blog.loading) &&
        <div className="end" onClick={loadMore} style={{ cursor: 'pointer' }}>Load More</div>
      }
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  blog: state.blog,
  user: state.user,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  blogLoading: () => {
    dispatch(blogActions.blogLoading());
  },
  loadBlogSuccess: (posts: IPost[]) => {
    dispatch(blogActions.loadBlogSuccess(posts));
  },
  allLoaded: () => {
    dispatch(blogActions.allLoaded());
  },
  logout: () => {
    dispatch(userActions.logout());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomePage);
