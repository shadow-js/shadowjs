import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { createShadowComponent } from './ThemeProvider';

const propTypes = {
  as: PropTypes.elementType,
  /** Make the jumbotron full width, and without rounded corners */
  fluid: PropTypes.bool,
  /** @default 'jumbotron' */
  ShadowPrefix: PropTypes.string,
};

const defaultProps = {
  fluid: false,
};

class Jumbotron extends React.Component {
  render() {
    const {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      className,
      fluid,
      ShadowPrefix,
      ...props
    } = this.props;
    const classes = {
      [ShadowPrefix]: true,
      [`${ShadowPrefix}-fluid`]: fluid,
    };
    return <Component {...props} className={classNames(className, classes)} />;
  }
}

Jumbotron.propTypes = propTypes;
Jumbotron.defaultProps = defaultProps;

export default createShadowComponent(Jumbotron, 'shadow-jumbotron');
