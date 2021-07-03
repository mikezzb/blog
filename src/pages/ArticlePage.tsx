import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiArrowLeft, FiEdit } from 'react-icons/fi';

import CommentsView from '../components/article/CommentsView';
import {
  COMMENT_DELETE_ALL, BLOG_DELETE,
} from '../constants/apis';
import './ArticlePage.css';
import '../components/article/github-markdown.css';
import '../components/article/markdown-dark.css';
import mdParser from '../components/edit/mdParser';
import EditPage from './EditPage';
import Loading from '../components/Loading';
import Header from '../components/Header';
import * as actions from '../store/blog/actions';
import { AppDispatch, RootState } from '../store';

type IArticleParams = {
  id: string,
};

interface IArticlePageProps extends PropsFromRedux {
  updateCategory?: () => any,
  goBack?: () => any,
}

const ArticlePage = (props: IArticlePageProps) => {
  const history = useHistory();
  const { id: selectedArticleID } = useParams<IArticleParams>();
  const [editing, setEditing] = useState(false);

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

    axios.post(COMMENT_DELETE_ALL, { article_id: selectedArticleID }) // to delete all associated comments
      .then(() => {})
      .catch(error => {
        console.warn(error);
      });
  };

  const selectedArticle = props.blog.posts.find(post => post._id === selectedArticleID);
  if (editing) {
    return (
      <EditPage
        goBack={() => setEditing(false)}
        selectedArticle={selectedArticle}
      />
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
          <CommentsView />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  deletePost: (id: string) => {
    dispatch(actions.deletePost(id));
  },
});

const mapStateToProps = (state: RootState) => ({
  blog: state.blog,
  user: state.user.user,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ArticlePage);
