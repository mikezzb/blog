import React, {
  useState, useRef, useEffect, useReducer, MutableRefObject
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

const FORM_ITEMS = [
  {
    value: 'title',
    placeholder: 'Title',
  },
  {
    value: 'tags',
    placeholder: 'Tags (Optional)',
  },
  {
    value: 'category',
    placeholder: 'Set category (0-4) (Optional)',
    type: 'number',
  },
  {
    value: 'backgroundURL',
    placeholder: 'Cover image URL (Optional)',
  },
];

interface IMdEditor {
  getMdValue?: () => any,
  setText?: (value: string) => any,
}

const EditPage = props => {
  const history = useHistory();
  const mdEditor: MutableRefObject<IMdEditor> = useRef({});

  const [editing, setEditing] = useState(false);

  const [blogData, setBlogData] = useReducer(
    (state, action) => ({ ...state, ...action }),
    {
      title: '',
      tags: '',
      category: '',
      backgroundURL: '',
    }
  );

  const renderHTML = text => new Promise(resolve => {
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
      <header className="header edit-page">
        <div className="headerWrapper edit-page">
          <FiArrowLeft className="back-icon" onClick={() => history.goBack()} />
          <nav className="navSession flex-row">
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
        <form onSubmit={e => handleGetMdValue(e)} style={{}}>
          {
            FORM_ITEMS.map(item => (
              <div key={item.value} className="inputFormWrapper">
                <input
                  type={item.type || 'text'}
                  required
                  className="form-control"
                  placeholder={item.placeholder}
                  value={blogData[item.value]}
                  onChange={e => setBlogData({ [item.value]: e.target.value })}
                />
              </div>
            ))
          }
        </form>
        <MdEditor
          ref={mdEditor as any}
          defaultValue={(props.selectedArticle && props.selectedArticle.content) || JSON.parse(Cookies.get('blogSaved') || 'null') && JSON.parse(Cookies.get('blogSaved') || 'null').content || 'Content'}
          renderHTML={renderHTML as any}
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
