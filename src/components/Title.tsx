import { PropsWithChildren } from 'react';
import Author from './Author';

type ITitleProps = {
  icon: string,
  tag: string,
  isArticle: boolean,
  username: string,
};

export default function Title({
  icon, isArticle, tag, username, children,
}: PropsWithChildren<ITitleProps>) {
  return (
    <div className="titleWrapper">
      <Author icon={icon} isArticle={isArticle} tag={tag}>{username}</Author>
      <div className="title">{children}</div>
    </div>
  );
}
