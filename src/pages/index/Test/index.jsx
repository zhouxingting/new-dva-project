import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../index.module.less';

const Test = (props) => {
  const data = useSelector((state) => state.test);
  console.log(data);
  return <div className={styles.color}>我是白色</div>;
};

export default Test;
