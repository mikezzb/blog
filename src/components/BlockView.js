import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  AiFillLinkedin, AiFillGithub, AiFillCode, AiFillRead
} from 'react-icons/ai';

import Block from './Block';
import HeaderView from './HeaderView';
import Ring from './Ring';
import * as actions from '../store/blog/actions';

const BlockView = props => {
  const [ended, setEnded] = useState(false);
  const [displayUserIconMenu, setDisplayUserIconMenu] = useState(false);
  const [category, setCategory] = useState(-1);

  const loadMore = () => {
    const url = 'blogs/';

    const skipJSON = {
      dateBefore: props.blog.posts[props.blog.posts.length - 1].createdAt,
    };

    axios.post(url, skipJSON)
      .then(res => {
        if (res.data && res.data.length) {
          // console.warn("server return: "+res.data);
          props.loadBlogSuccess(res.data);
          window.addEventListener('scroll', listenToScroll);
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

  const listenToScroll = () => {
    const distanceFromBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight;
    if (distanceFromBottom <= 100) {
      window.removeEventListener('scroll', listenToScroll);
      if (!props.blog.loaded) {
        loadMore();
      }
    }
  };

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
      setEnded(true);
    }
    else if (props.blog.loading === false) {
      window.addEventListener('scroll', listenToScroll);
    }
    return (() => window.removeEventListener('scroll', listenToScroll));
  }, [props.blog, listenToScroll]);

  return (
    <div>
      {
        displayUserIconMenu &&
        <div className="userMenuContainer">
          <div mode="inline" className="menuWrapper">
            <Link to="/edit" className="menuItem" key="Add Post" onClick={addPostOnclick}>Add Post</Link>
            <div className="menuItem" key="View My Posts" onClick={() => [setCategory(category === -2 ? -1 : -2), setDisplayUserIconMenu(false)]}>View My Posts</div>
            <div className="menuItem" key="Log Out" onClick={logout}>Log Out</div>
          </div>
        </div>
      }
      <HeaderView
        cookies={props.cookies}
        updateCategory={setCategory}
        isArticleView={false}
        userIconOnclick={() => setDisplayUserIconMenu(!displayUserIconMenu)}
      />
      <div className="blockView">
        {
          props.blog.loading ?
            <Ring /> :
            <>
              <div className="left blocks">
                {
                  props.blog.posts
                    .filter(post =>
                      category === post.category || category === -1 || (category === -2 && props.user.user.username === post.username)
                    )
                    .map(post => (
                      <Link
                        key={post._id}
                        className="blockWrapper"
                        to={{
                          pathname: `/article/${post._id}`,
                          index: props.blog.posts.findIndex(postItem => postItem.createdAt === post.createdAt),
                        }}
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
                          articleIndex={props.blog.posts.findIndex(postItem => postItem.createdAt === post.createdAt)}
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

function mapStateToProps(state, ownProps) {
  return {
    blog: state.blog,
    user: state.user,
  };
}

const mapDispatchToProps = dispatch => ({
  blogLoading: () => {
    dispatch(actions.blogLoading());
  },
  loadBlogSuccess: posts => {
    dispatch(actions.loadBlogSuccess(posts));
  },
  allLoaded: () => {
    dispatch(actions.allLoaded());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BlockView);
