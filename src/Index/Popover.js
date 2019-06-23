import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import { createShadowComponent } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'popover'
   */
  ShadowPrefix: PropTypes.string,

  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),

  /**
   * Sets the direction the Popover is positioned towards.
   *
   * > This is generally provided by the `Overlay` component positioning the popover
   */
  placement: PropTypes.oneOf([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),

  /**
   * An Overlay injected set of props for positioning the popover arrow.
   *
   * > This is generally provided by the `Overlay` component positioning the popover
   */
  arrowProps: PropTypes.shape({
    ref: PropTypes.any,
    style: PropTypes.object,
  }),

  /** @private */
  innerRef: PropTypes.any,

  /** @private */
  scheduleUpdate: PropTypes.func,
  /** @private */
  outOfBoundaries: PropTypes.bool,
  /**
   * Title content
   */
  title: PropTypes.node,
};

const defaultProps = {
  placement: 'right',
};

function Popover({
  ShadowPrefix,
  innerRef,
  placement,
  className,
  style,
  title,
  children,
  arrowProps,
  scheduleUpdate: _,
  outOfBoundaries: _1,
  ...props
}) {
  return (
    <div
      role="tooltip"
      ref={innerRef}
      style={style}
      x-placement={placement}
      className={classNames(className, ShadowPrefix, `shadow-popover-${placement}`)}
      {...props}
    >
      <div className="arrow" {...arrowProps} />

      {title && <div className={`${ShadowPrefix}-header h3`}>{title}</div>}

      <div className={`${ShadowPrefix}-body`}>{children}</div>
    </div>
  );
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default createShadowComponent(Popover, 'popover');
