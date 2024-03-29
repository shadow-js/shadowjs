import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import AbstractNavItem from './AbstractNavItem';
import { makeEventKey } from './SelectableContext';
import { createShadowComponent } from './ThemeProvider';

class ListGroupItem extends React.Component {
  static propTypes = {
    /**
     * @default 'list-group-item'
     */
    ShadowPrefix: PropTypes.string.isRequired,

    /**
     * Sets contextual classes for list item
     * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
     */
    variant: PropTypes.string,
    /**
     * Marks a ListGroupItem as actionable, applying additional hover, active and disabled styles
     * for links and buttons.
     */
    action: PropTypes.bool,
    /**
     * Sets list item as active
     */
    active: PropTypes.bool,

    /**
     * Sets list item state as disabled
     */
    disabled: PropTypes.bool,

    eventKey: PropTypes.string,

    onClick: PropTypes.func,

    /**
     * You can use a custom element type for this component. For none `action` items, items render as `li`.
     * For actions the default is an achor or button element depending on whether a `href` is provided.
     *
     * @default {'div' | 'a' | 'button'}
     */
    as: PropTypes.elementType,
  };

  static defaultProps = {
    variant: null,
    active: false,
    disabled: false,
  };

  handleClick = event => {
    const { onClick, disabled } = this.props;
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (onClick) onClick(event);
  };

  render() {
    const {
      ShadowPrefix,
      active,
      disabled,
      className,
      variant,
      action,
      as,
      eventKey,
      ...props
    } = this.props;

    return (
      <AbstractNavItem
        {...props}
        eventKey={makeEventKey(eventKey, props.href)}
        // eslint-disable-next-line
        as={as || (action ? (props.href ? 'a' : 'button') : 'div')}
        onClick={this.handleClick}
        className={classNames(
          className,
          ShadowPrefix,
          active && 'active',
          disabled && 'disabled',
          variant && `${ShadowPrefix}-${variant}`,
          action && `${ShadowPrefix}-action`,
        )}
      />
    );
  }
}

export default createShadowComponent(ListGroupItem, 'shadow-list-group-item');
