import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiArrowLeft, FiEdit } from 'react-icons/fi';

import {
  COMMENT_ADD, COMMENT_LOAD, COMMENT_DELETE, COMMENT_DELETE_ALL, BLOG_DELETE
} from '../constants/apis';
import './ArticlePage.css';
import '../components/article/github-markdown.css';
import '../components/article/markdown-dark.css';
import mdParser from '../components/edit/mdParser';
import EditPage from './EditPage';
import Loading from '../components/Loading';
import Header from '../components/Header';
import * as actions from '../store/blog/actions';

const dataFormatting = n => (n > 9 ? `${n}` : `0${n}`);
const toDDMMMYYYY = date => (`${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ')} ${dataFormatting(date.getHours())}:${dataFormatting(date.getMinutes())}`);

const Image = props => (<img {...props} style={{ maxWidth: '100%' }} />);

const ArticlePage = props => {
  const history = useHistory();
  const selectedArticleID = useParams().id;
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [editing, setEditing] = useState(false);

  const loadComments = () => {
    axios.post(COMMENT_LOAD, { article_id: selectedArticleID })
      .then(res => setComments(res.data))
      .catch(error => {
        alert(error);
      });
  };

  useEffect(() => {
    loadComments();
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = e => {
    e.preventDefault(); // to prevent auto refresh due to form submit

    const comment = {
      content: commentInput,
      username: props.user.username,
      userIcon: props.user.iconURL,
      article_id: selectedArticleID,
    };

    axios.post(COMMENT_ADD, comment)
      .then(() => {
        setCommentInput('');
        loadComments();
      })
      .catch(error => {
        alert(error);
      });
  };

  const deletePost = () => {
    axios.post(BLOG_DELETE, { article_id: selectedArticleID })
      .then(res => {
        if (res.data) {
          history.push('/');
          props.deletePost(res.data);
        }
        else {
          alert(res.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios.post(COMMENT_DELETE_ALL, { article_id: selectedArticleID })// to delete all associated comments
      .then(() => {})
      .catch(error => {
        console.warn(error);
      });
  };

  const deleteComment = id => {
    axios.post(COMMENT_DELETE, { comment_id: id })
      .then(res => {
        if (res.data === true) {
          loadComments();
        }
        else {
          alert(res.data);
        }
      })
      .catch(error => {
        alert(`Please Login Before Comment \n${error}`);
      });
  };

  const selectedArticle = props.blog.posts.find(post => post._id === selectedArticleID);
  if (editing) {
    return (
      <EditPage goBack={() => setEditing(false)} selectedArticle={selectedArticle} />
    );
  }
  if (props.blog.loading) {
    return (<Loading />);
  }
  return (
    <div className="article">
      <Header
        updateCategory={props.updateCategory}
        goBack={props.goBack}
        isArticleView
        selectedArticle={selectedArticle}
        articleIndex={props.blog.posts.findIndex(post => post._id === selectedArticleID)}
      />
      <div>
        <div className="article-header-stick" style={{ width: '90%', color: 'white' }}>
          <Link to="/">
            <FiArrowLeft
              style={{
                cursor: 'pointer', zIndex: 100, position: 'relative', fontSize: '30px', marginTop: '12px',
              }}
            />
          </Link>
          {
            selectedArticle.username === props.user.username &&
              (
                <>
                  <FiEdit
                    onClick={() => setEditing(!editing)}
                    style={{
                      paddingLeft: '20px', float: 'right', cursor: 'pointer', color: 'white', zIndex: 100, fontSize: '25px', marginTop: '15px',
                    }}
                  />
                  <AiOutlineDelete
                    onClick={deletePost}
                    style={{
                      float: 'right', cursor: 'pointer', color: 'white', zIndex: 100, fontSize: '30px', marginTop: '12px',
                    }}
                  />
                </>
              )
          }
        </div>
        <div className="blog-container">
          <div
            className={`blog-body ${window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'markdown-body-dark' : 'markdown-body'}`}
            dangerouslySetInnerHTML={{ __html: mdParser.render(selectedArticle.content) }}
          />
          <div className="replyBackground">
            <div className="replyWrapper">
              <div className="replyTag">Replies:</div>
              {
                comments.map(comment => (
                  <div style={{ cursor: 'auto', marginTop: '30px' }} className="blockWrapper reply">
                    <div className="blockInnerWrapper" style={{ padding: '5px 8px' }}>
                      <div className="author">
                        <img className="icon" src={comment.userIcon} alt="icon" />
                        <p className="authorName">{comment.username}</p>
                        <div className="tagName">{toDDMMMYYYY(new Date(comment.createdAt))}</div>
                        {
                          comment.username === props.user.username &&
                          <div
                            onClick={() => deleteComment(comment._id)}
                            style={{
                              cursor: 'pointer', float: 'right', width: '16px', height: '16px', marginLeft: 'auto', marginTop: '10px',
                            }}
                          >
                            <AiOutlineDelete />
                          </div>
                        }
                      </div>
                      <div
                        className="blockContent"
                        style={{
                          margin: '10px 7px', maxHeight: 'none', textOverflow: 'clip', whiteSpace: 'normal', overflow: 'visible',
                        }}
                      >
                        {comment.content}
                      </div>
                    </div>
                  </div>
                ))
              }
              <form onSubmit={onSubmit}>
                <div className="form-group" style={{ width: '100%' }}>
                  <textarea
                    required
                    className="form-control"
                    placeholder={props.user.username ? '偉論' : 'Please login before posting comment'}
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    disabled={!props.user.username}
                    style={{ flexGrow: '1', minHeight: '60px' }}
                  />
                </div>
                <div className="form-group-submit" style={{ width: '100%' }}>
                  <input type="submit" value="Submit" className="submitButton" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  deletePost: id => {
    dispatch(actions.deletePost(id));
  },
});

function mapStateToProps(state, ownProps) {
  return {
    blog: state.blog,
    user: state.user.user || {},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
