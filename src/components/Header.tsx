import React, { useState, useReducer, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { slide as Menu } from 'react-burger-menu';
import { connect, ConnectedProps } from 'react-redux';
import Cookies from 'js-cookie';

import { CATEGORIES } from '../constants';
import * as actions from '../store/user/actions';
import LoginView from './Login';
import TitleView from './Title';
import getGradient from '../utils/getGradient';
import { AppDispatch, RootState } from '../store';
import { IPost, IUser } from '../interfaces';

const navTags = ['All', 'Playground', 'Learning', 'ACG', 'Time Machine'];

interface IHeaderProps extends PropsFromRedux {
  isArticleView: boolean,
  userIconOnclick?: any,
  updateCategory?: any,
  selectedArticle?: IPost,
  goBack?: any,
}

const Header = (props: IHeaderProps) => {
  const [displayLogin, setDisplayLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [navClicked, setNavClicked] = useReducer(
    (state, active) => Object.keys(state).reduce(
      (result, nav) => ({ ...result, [nav]: active === nav }),
      {},
    ),
    {
      all: true,
    },
  );

  const tagOnclick = (index, label) => {
    props.updateCategory(label === 'All' ? CATEGORIES.INITIAL : index - 1);
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
      <div
        className={navClicked[tag] ? 'navItemContainerClicked' : 'navItemContainer'}
        onClick={() => [setNavClicked(tag), tagOnclick(index, tag)]}
        key={tag}
      >
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
            {
              props.user.loggedIn ?
                <img src={props.user.user.iconURL} alt={props.user.user.username} className="headerIcon" style={{ cursor: 'pointer' }} /> :
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/dc/Knockoff_Little_Totoro.svg" alt="" className="siteLogo" style={{ cursor: 'pointer' }} />
            }
          </div>
          {
            isMobile ?
              (
                <Menu
                  key="menu"
                  right
                  noOverlay
                  isOpen={menuOpen}
                  onStateChange={state => setMenuOpen(state.isOpen)}
                  onClick={() => setMenuOpen(false)}
                >
                  {NavElements()}
                </Menu>
              ) :

              (
                <nav className="navSession">
                  {NavElements()}
                </nav>
              )

          }
        </div>
      </header>
      {displayLogin ? <LoginView handler={() => setDisplayLogin(false)} /> : null}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  displayLogin: (user: IUser) => {
    dispatch(actions.displayLogin(user));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);
