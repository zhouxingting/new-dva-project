import React from 'react';
import { useSelector } from 'react-redux';
import Test from './Test';
import styles from './index.module.less';

const Home = (props) => {
  const data = useSelector((state) => state.test);
  console.log(data);
  return (
    <div className={styles.color}>
      我是红色
      <Test />
    </div>
  );
};

export default Home;
