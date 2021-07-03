import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  AiFillLinkedin, AiFillGithub
} from 'react-icons/ai';

import { MyLocation } from '../interfaces';
import useDebounce from '../functions/useDebounce';
import { BLOG_LOAD } from '../constants/apis';
import './HomePage.css';
import Block from '../components/home/Block';
import Header from '../components/Header';
import Loading from '../components/Loading';
import * as actions from '../store/blog/actions';

const HomePage = (props: { blog: { posts: any[]; loaded: any; loading: any; }; loadBlogSuccess: (arg0: any) => void; allLoaded: () => void; logout: () => void; cookies: any; user: { user: { username: any; }; }; }) => {
  const [ended, setEnded] = useState(false);
  const [displayUserIconMenu, setDisplayUserIconMenu] = useState(false);
  const [category, setCategory] = useState(-1);

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
    setCategory(-1);
    Cookies.remove('loggedInUser');
    setDisplayUserIconMenu(false);
    alert('Logged out successfully!');
  };

  const addPostOnclick = () => {
    setDisplayUserIconMenu(false);
  };

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
    setCategory(category === -2 ? -1 : -2);
    setDisplayUserIconMenu(false);
  };

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
        cookies={props.cookies}
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
                      .filter((post: { category: number; username: any; }) => category === post.category || category === -1 || (category === -2 && props.user.user.username === post.username))
                      .map((post: { _id: React.Key; createdAt: React.Key; category: any; tags: any; userIcon: any; username: any; content: any; backgroundURL: any; title: any; }) => (
                        <Link
                          key={post._id}
                          className="blockWrapper"
                          to={{
                            pathname: `/article/${post._id}`,
                            index: props.blog.posts.findIndex((postItem: { createdAt: any; }) => postItem.createdAt === post.createdAt),
                          } as MyLocation}
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

function mapStateToProps(state: { blog: any; user: any; }, ownProps: any) {
  return {
    blog: state.blog,
    user: state.user,
  };
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; isLoading?: boolean; posts?: any; loaded?: boolean; }) => void) => ({
  blogLoading: () => {
    dispatch(actions.blogLoading());
  },
  loadBlogSuccess: (posts: any) => {
    dispatch(actions.loadBlogSuccess(posts));
  },
  allLoaded: () => {
    dispatch(actions.allLoaded());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
