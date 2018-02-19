import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

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

const StackedPage = ({
  classes,
  navTitle,
  children,
  onBack,
  rightButton,
  rightButtonText,
  rightButtonIcon,
  onRightButtonClick
}) => (
  <div className={classes.root}>
    <Header
      title={navTitle}
      backButton={true}
      onButtonClick={onBack}
      renderRightSection={() => {
        if (rightButton) {
          return rightButtonText ? (
            <Button onClick={onRightButtonClick} color="inherit">
              {rightButtonText}
            </Button>
          ) : (
            <IconButton onClick={onRightButtonClick} color="inherit">
              <Icon>{rightButtonIcon}</Icon>
            </IconButton>
          );
        }
        return null;
      }}
    />
    <div className={classes.content}>{children}</div>
  </div>
);

export default withStyles(styles)(StackedPage);
