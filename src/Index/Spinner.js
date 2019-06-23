import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { createShadowComponent } from './ThemeProvider';

class Spinner extends React.Component {
  static propTypes = {
    /**
     * @default 'spinner'
     */
    ShadowPrefix: PropTypes.string.isRequired,

    /**
     * The visual color style of the spinner
     *
     * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
     */
    variant: PropTypes.string,

    /**
     * Changes the animation style of the spinner.
     *
     * @type {('border'|'grow')}
     * @default true
     */
    animation: PropTypes.oneOf(['border', 'grow']).isRequired,

    /**
     * Component size variations.
     *
     * @type {('sm')}
     */
    size: PropTypes.string,

    /**
     * This component may be used to wrap child elements or components.
     */
    children: PropTypes.element,

    /**
     * An ARIA accessible role applied to the Menu component. This should generally be set to 'status'
     */
    role: PropTypes.string,

    /**
     * @default div
     */
    as: PropTypes.elementType,
  };

  render() {
    const {
      ShadowPrefix,
      variant,
      animation,
      size,
      children,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      className,
      ...props
    } = this.props;
    const bsSpinnerPrefix = `${ShadowPrefix}-${animation}`;

    return (
      <Component
        {...props}
        className={classNames(
          className,
          bsSpinnerPrefix,
          size && `${bsSpinnerPrefix}-${size}`,
          variant && `text-${variant}`,
        )}
      >
        {children}
      </Component>
    );
  }
}

export default createShadowComponent(Spinner, 'shadow-spinner');
