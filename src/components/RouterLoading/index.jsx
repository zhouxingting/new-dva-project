import React from 'react';
import { Spin } from 'antd';
import styles from './index.module.less';

export default class RouterLoading extends React.Component {
  render() {
    return <Spin className={styles.loading} />;
  }
}
