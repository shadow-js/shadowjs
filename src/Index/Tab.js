import PropTypes from 'prop-types';
import React from 'react';

import TabContainer from './TabContainer';
import TabContent from './TabContent';
import TabPane from './TabPane';

class Tab extends React.Component {
  static propTypes = {
    title: PropTypes.node.isRequired,
  };

  render() {
    throw new Error(
      'valid for direct child',
    );
  }
}

Tab.Container = TabContainer;
Tab.Content = TabContent;
Tab.Pane = TabPane;

export default Tab;
