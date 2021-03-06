/**
 * 歌单封面组件
 */

import React, { MouseEvent } from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

interface Data {
  name: string; // 歌单名称
  id: number; // 歌单 id
  coverImgUrl: string; // 歌单封面图片 url
}

interface Props {
  data: Data;
  onClick?: (data: Data) => void;
  containerClassName?: string;
}

function Cover(props: Props): JSX.Element {
  const { data } = props;

  function handleClick(e: MouseEvent): void {
    e.stopPropagation();

    const { onClick } = props;
    onClick && onClick(data);
  }

  const { containerClassName } = props;

  return (
    <figure className={classnames(styles.container, containerClassName)}>
      <a onClick={handleClick}>
        <div className={classnames(styles.imgContainer)}>
          <img src={data.coverImgUrl} alt='' />
        </div>
      </a>

      <figcaption>
        <a onClick={handleClick} className={styles.text}>
          {data.name}
        </a>
      </figcaption>
    </figure>
  );
}

export default Cover;
