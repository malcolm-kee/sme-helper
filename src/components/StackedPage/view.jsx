import React from 'react';
import { withStyles } from 'material-ui/styles';

import Header from '../Header';

const styles = themes => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: themes.zIndex.modal
  },
  content: {
    flex: 1,
    overflowY: 'scroll'
  }
});

const StackedPage = ({ classes, navTitle, children, onBack }) => (
  <div className={classes.root}>
    <Header title={navTitle} backButton={true} onButtonClick={onBack} />
    <div className={classes.content}>{children}</div>
  </div>
);

export default withStyles(styles)(StackedPage);
