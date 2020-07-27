import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Test from './Test';
import styles from './index.module.less';

const Home = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test);
  console.log(data);
  // console.log(props.history);

  React.useEffect(() => {
    dispatch({
      type: 'test/add',
    });
  }, [dispatch]);
  return (
    <div className={styles.color}>
      我是红色
      <Test />
    </div>
  );
};

export default Home;
