import React from 'react';
import Author from '../Author';
import getGradient from '../../utils/getGradient';
import { toDDMMMYYYY } from '../../utils';

type IBlockProps = {
  tag: string,
  date: string,
  icon: string,
  username: string,
  content: string,
  background: string,
  title: string,
  category: number,
};

export default function Block({
  tag, date, icon, username, content, background, title, category,
}: IBlockProps) {
  const hasCover = (background !== '0' && background !== '');
  return (
    <>
      <span>
        <Author tag={tag} icon={icon} isArticle={false}>{username}</Author>
        <div className="blockTitle">{title}</div>
        <div className="blockContent">{content.split(/\n/).map((p, i) => i < 4 && p !== '' && `${p.replace(/#|\*|!\[\]|>|^\s*\n/gm, '').replace(/^\s/m, '')}\n`)}</div>
        <span>{toDDMMMYYYY(new Date(date))}</span>
      </span>
      <div
        key={`${date}-${title}`}
        className={`blockCover${hasCover ? '' : ' noImage'}`}
        style={
          hasCover ?
            { backgroundPosition: 'center', backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) ), url(${background})` } :
            { background: getGradient(category) }
        }
      />
    </>
  );
}
