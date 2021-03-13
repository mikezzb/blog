import React, {
  useState, useRef, useEffect, useReducer
} from 'react';
import { useHistory } from 'react-router-dom';
import MdEditor from 'react-markdown-editor-lite';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'react-markdown-editor-lite/lib/index.css';
import { connect } from 'react-redux';
import { FiArrowLeft } from 'react-icons/fi';

import './EditPage.css';
import { BLOG_CREATE, BLOG_UPDATE } from '../constants/apis';
import mdParser from '../components/edit/mdParser';
import * as actions from '../store/blog/actions';

const EditPage = props => {
  const history = useHistory();
  const mdEditor = useRef({});

  const [editing, setEditing] = useState(false);

  const [blogData, setBlogData] = useReducer(
    (state, action) => ({ ...state, ...action }),
    {
      title: '',
      tags: '',
      category: null,
      backgroundURL: '',
    }
  );

  const renderHTML = text =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(mdParser.render(text));
      }, 1000);
    });

  const init = async () => {
    const raw = Cookies.get('blogSaved' || '');
    const blogSaved = raw ? JSON.parse(raw) : null;
    if (props.selectedArticle || blogSaved) {
      const preloadArticle = props.selectedArticle || blogSaved;
      setBlogData({
        title: preloadArticle.title,
        tags: preloadArticle.tags,
        category: preloadArticle.category,
        backgroundURL: preloadArticle.backgroundURL,
      });
      setEditing(Boolean(props.selectedArticle));
    }
  };

  useEffect(() => {
    init();
  }, [props.selectedArticle]);

  const handleSave = () => {
    const blog = blogData;
    blog.username = props.user.username;
    blog.content = mdEditor.current.getMdValue();
    blog.category = blog.category || 0;
    Cookies.set('blogSaved', blog, { expires: 3 });
    alert('Saved as Draft!');
  };

  const reset = () => {
    setBlogData({});
    mdEditor.current.setText('');
  };

  const handleGetMdValue = e => {
    e.preventDefault();
    const blog = blogData;
    blog.content = mdEditor.current.getMdValue();
    blog.username = props.user.username;
    blog.userIcon = props.user.iconURL;
    blog.category = blog.category || 0;

    if (editing) {
      axios.put(`${BLOG_UPDATE}${props.selectedArticle._id}`, blog)
        .then(res => {
          Cookies.remove('blogSaved');
          props.updatePost({
            ...blog,
            _id: props.selectedArticle._id,
          });
        })
        .catch(error => {
          alert(error);
        });
    }
    else {
      axios.post(BLOG_CREATE, blog)
        .then(res => {
          Cookies.remove('blogSaved');
          props.addPost(res.data);
        })
        .catch(error => {
          alert(error);
        });
    }
    history.push('/');
  };
  const isMobile = window.matchMedia && window.matchMedia('(max-width: 1260px)').matches;
  return (
    <div className="edit-page-container">
      <header className="header" style={{ height: '60px' }}>
        <div className="headerWrapper" style={{ marginTop: '3px' }}>
          <FiArrowLeft onClick={() => history.goBack()} style={{ position: 'relative', fontSize: '30px', marginTop: '8px' }} />
          <nav className="navSession" style={{ float: 'right', marginRight: '0' }}>
            <div className="navItemContainer" onClick={reset}>
              <span className="navItem">Reset</span>
            </div>
            <div className="navItemContainer" onClick={handleSave}>
              <span className="navItem">Save</span>
            </div>
            <div className="navItemContainer" onClick={handleGetMdValue}>
              <span className="navItem">Submit Post</span>
            </div>
          </nav>
        </div>
      </header>
      <section className="section-container">
        <form onSubmit={() => handleGetMdValue()} style={{}}>
          <div className="inputFormWrapper">
            <input
              type="text"
              required
              className="form-control"
              placeholder="Title"
              value={blogData.title}
              onChange={e => setBlogData({ title: e.target.value })}
            />
          </div>
          <div className="inputFormWrapper">
            <input
              type="text"
              className="form-control"
              placeholder="Tags (Optional)"
              value={blogData.tags}
              onChange={e => setBlogData({ tags: e.target.value })}
            />
          </div>
          <div className="inputFormWrapper">
            <input
              type="text"
              className="form-control"
              placeholder="Cover image URL (Optional)"
              value={blogData.backgroundURL}
              onChange={e => setBlogData({ backgroundURL: e.target.value })}
            />
          </div>
          <div className="inputFormWrapper">
            <input
              type="number"
              className="form-control"
              placeholder="Set category (0-4) (Optional)"
              value={blogData.category}
              onChange={e => setBlogData({ category: e.target.value })}
            />
          </div>
        </form>
        <MdEditor
          className="md-editor-container"
          ref={mdEditor}
          defaultValue={(props.selectedArticle && props.selectedArticle.content) || JSON.parse(Cookies.get('blogSaved') || 'null') && JSON.parse(Cookies.get('blogSaved') || 'null').content || 'Content'}
          renderHTML={renderHTML}
          config={{
            view: {
              menu: true,
              md: true,
              html: !isMobile,
            },
            imageUrl: 'https://octodex.github.com/images/minion.png',
          }}
        />
      </section>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addPost: post => {
    dispatch(actions.addPost(post));
  },
  updatePost: post => {
    dispatch(actions.updatePost(post));
  },
});

function mapStateToProps(state) {
  return {
    user: state.user.user,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
