import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import StackedPageView from './view';

class StackedPageContainer extends React.Component {
  static propTypes = {
    navTitle: PropTypes.string,
    rightButton: PropTypes.bool,
    rightButtonIcon: PropTypes.string,
    onRightButtonClick: PropTypes.fun
  };

  static defaultProps = {
    navTitle: ''
  };

  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    return <StackedPageView onBack={this.handleBack} {...this.props} />;
  }
}

export const StackedPage = withRouter(StackedPageContainer);

export default StackedPage;
