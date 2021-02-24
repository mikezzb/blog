import React from 'react';
import Author from './Author';

export default function TitleView({
  icon, isArticle, tag, date, username, children,
}) {
  return (
    <div className="titleWrapper">
      <Author icon={icon} isArticle={isArticle} tag={tag} date={date}>{username}</Author>
      <div className="title">{children}</div>
    </div>
  );
}
