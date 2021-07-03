import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';

import './CommentsView.css';
import {
  COMMENT_ADD, COMMENT_LOAD, COMMENT_DELETE,
} from '../../constants/apis';
import * as actions from '../../store/blog/actions';
import { AppDispatch, RootState } from '../../store';
import { toDDMMMYYYY } from '../../utils';

const CommentsView = (props: PropsFromRedux) => {
  const selectedArticleID = (useParams() as any).id;
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

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
    e.preventDefault();

    const comment = {
      content: commentInput,
      username: props.user.user.username,
      userIcon: props.user.user.iconURL,
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

  return (
    <div className="replyBackground">
      <div className="replyWrapper">
        <div className="replyTag">Replies:</div>
        {
          comments.map(comment => (
            <div style={{ cursor: 'auto', marginTop: '30px' }} className="blockWrapper reply">
              <div className="blockInnerWrapper" style={{ padding: '5px 8px' }}>
                <div className="author">
                  <img className="icon" src={comment.userIcon} alt="icon" />
                  <p className="authorName">{comment.username || 'Anonymous'}</p>
                  <div className="tagName">{toDDMMMYYYY(new Date(comment.createdAt))}</div>
                  {
                    comment.username && comment.username === props.user.user.username &&
                    (
                      <div
                        onClick={() => deleteComment(comment._id)}
                        style={{
                          cursor: 'pointer', float: 'right', width: '16px', height: '16px', marginLeft: 'auto', marginTop: '10px',
                        }}
                      >
                        <AiOutlineDelete />
                      </div>
                    )
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
              placeholder="Your Reply"
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              style={{ flexGrow: 1, minHeight: '60px' }}
            />
          </div>
          <div className="form-group-submit" style={{ width: '100%' }}>
            <input type="submit" value="Submit" className="submitButton" />
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  deletePost: id => {
    dispatch(actions.deletePost(id));
  },
});

const mapStateToProps = (state: RootState) => ({
  blog: state.blog,
  user: state.user,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CommentsView);
