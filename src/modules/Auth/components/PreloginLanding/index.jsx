import React from 'react';

import PreloginLanding from './view';

class PreloginLandingContainer extends React.Component {
  state = {
    pageLoaded: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ pageLoaded: true });
    }, 500);
  }

  render() {
    return <PreloginLanding pageLoaded={this.state.pageLoaded} />;
  }
}

export default PreloginLandingContainer;
