import React from 'react';
import { Icon, Tabs } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { Tab } from 'material-ui/Tabs';

import SwipeableViews from 'react-swipeable-views';

const styles = theme => ({
  root: {
    flex: 1,
    position: 'relative',
    maxWidth: '100vw'
  },
  controller: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center'
  },
  swipeView: {
    height: '100%'
  },
  tab: {
    ...theme.typography.button,
    maxWidth: 264,
    position: 'relative',
    minWidth: 20,
    padding: 0,
    height: 48,
    flex: 'none',
    overflow: 'hidden'
  },
  tabIcon: {
    fontSize: theme.typography.body1.fontSize
  }
});

const Carousel = ({ activePage, onIndexChange, onPageChange, classes, children }) => {
  const controlIcon = <Icon className={classes.tabIcon}>fiber_manual_record</Icon>;

  return (
    <div className={classes.root}>
      <SwipeableViews
        className={classes.swipeView}
        index={activePage}
        onChangeIndex={onIndexChange}
        containerStyle={{ height: '100%' }}
      >
        {React.Children.map(children, child => {
          const finalClass = child.props.className
            ? `${child.props.className} ${classes.swipeView}`
            : classes.swipeView;
          return React.cloneElement(child, { className: finalClass });
        })}
      </SwipeableViews>
      <div className={classes.controller}>
        <Tabs
          value={activePage}
          onChange={onPageChange}
          textColor="primary"
          indicatorColor="transparent"
          centered
        >
          {React.Children.map(children, child => (
            <Tab
              icon={controlIcon}
              classes={{
                root: classes.tab
              }}
            />
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default withStyles(styles)(Carousel);
