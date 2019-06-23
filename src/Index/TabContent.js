import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { createShadowComponent } from './ThemeProvider';

class TabContent extends React.Component {
  static propTypes = {
    /**
     * @default 'tab-content'
     */
    ShadowPrefix: PropTypes.string,

    as: PropTypes.elementType,
  };

  render() {
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    const { ShadowPrefix, as: Component = 'div', className, ...props } = this.props;

    return <Component {...props} className={classNames(className, ShadowPrefix)} />;
  }
}

export default createShadowComponent(TabContent, 'shadow-tab-content');
