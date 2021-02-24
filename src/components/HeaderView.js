import React, { useState, useReducer, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import * as actions from '../store/user/actions';
import LoginView from './LoginView';
import TitleView from './TitleView';
import getGradient from '../functions/getGradient';

const navTags = ['All', 'Playground', 'Learning', 'ACG', 'Time Machine'];

const HeaderView = (props, { isArticleView }) => {
  const [displayLogin, setDisplayLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [navClicked, setNavClicked] = useReducer(
    (state, active) => Object.keys(state).reduce(
      (result, nav) => ({ ...result, [nav]: active === nav }),
      {}
    ),
    {
      all: true,
    }
  );

  const tagOnclick = index => {
    if (props.isArticleView) {
      props.updateCategory(index - 1);
      props.goBack();
    }
    else props.updateCategory(index - 1);
    setMenuOpen(false);
  };

  const iconOnclickAction = () => {
    if (props.user.loggedIn) {
      props.userIconOnclick();
    }
    else {
      window.scrollTo(0, 0);
      setDisplayLogin(true);
    }
  };

  const listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    setScrollPosition(winScroll);
  };

  const NavElements = () => (
    navTags.map((tag, index) => (
      <div className={navClicked[tag] ? 'navItemContainerClicked' : 'navItemContainer'} onClick={() => [setNavClicked(tag), tagOnclick(index)]} key={tag}>
        <span className="navItem">{tag}</span>
      </div>
    ))
  );

  useEffect(() => {
    if (props.isArticleView) {
      window.addEventListener('scroll', listenToScroll);
    }
    const userString = Cookies.get('loggedInUser');
    if (userString != null) {
      const user = JSON.parse(userString);
      props.displayLogin(user); // dispatch user info into redux
    }
    return (() => window.removeEventListener('scroll', listenToScroll));
  }, []);

  if (props.isArticleView) {
    return (
      <header className="header" style={{ position: 'relative' }}>
        <div
          className="backgroundArticle"
          style={
            props.selectedArticle.backgroundURL === '' ?
              { background: getGradient(props.selectedArticle.category) } :
              { backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(${props.selectedArticle.backgroundURL})` }
          }
        />
        <div className={`articleNavBackground${scrollPosition > 400 ? ' short' : ''}`} />
        <div className="headerWrapper">
          <TitleView
            icon={props.selectedArticle.userIcon}
            username={props.selectedArticle.username}
            isArticle={props.isArticleView}
            tag={props.selectedArticle.tags}
            date={props.selectedArticle.createdAt}
          >
            {props.selectedArticle.title}
          </TitleView>
        </div>
      </header>
    );
  }
  return (
    <div>
      <header className="header home">
        <div className="headerWrapper" style={{}}>
          <div className="logoWrapper" onClick={iconOnclickAction}>
            {props.user.loggedIn ?
              <img src={props.user.user.iconURL} alt={props.user.user.username} className="headerIcon" style={{ cursor: 'pointer' }} /> :
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/dc/Knockoff_Little_Totoro.svg" alt="" className="siteLogo" style={{ cursor: 'pointer' }} />}
          </div>
          {
            isMobile ?
              <Menu
                key="menu"
                right
                noOverlay
                isOpen={menuOpen}
                onStateChange={state => setMenuOpen(state.isOpen)}
                onClick={() => setMenuOpen(false)}
              >
                {NavElements()}
              </Menu> :

              <nav className="navSession">
                {NavElements()}
              </nav>

          }
        </div>
      </header>
      {displayLogin ? <LoginView handler={() => setDisplayLogin(false)} /> : null}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
const mapDispatchToProps = dispatch => ({
  displayLogin: user => {
    dispatch(actions.displayLogin(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderView);
