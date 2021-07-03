import { PropsWithChildren } from 'react';
import './Author.css';

type IAuthorProps = {
  isArticle: boolean,
  tag: string,
  icon: string,
};

export default function Author({
  isArticle, tag, children, icon,
}: PropsWithChildren<IAuthorProps>) {
  return (
    <div className={`author ${isArticle ? ' article' : ''}`}>
      <img
        className="icon"
        src={icon}
        alt="icon"
      />
      <p className="authorName">{children}</p>
      {
        tag &&
        tag.split(',').map(text => (
          <div className="tagName" key={text}>
            {text}
          </div>
        ))
      }
    </div>
  );
}
