import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';

import BaseDropdownToggle from 'react-overlays/DropdownToggle';
import React from 'react';

import Button from './Button';
import { createShadowComponent } from './ThemeProvider';

const wrapRef = props => {
  const { ref } = props;
  props.ref = ref.__wrapped || (ref.__wrapped = r => ref(findDOMNode(r)));
  return props;
};

class DropdownToggle extends React.Component {
  static propTypes = {
 
    ShadowPrefix: PropTypes.string,

    id: isRequiredForA11y(PropTypes.any),

    split: PropTypes.bool,

    as: PropTypes.elementType,

    
    childShadowPrefix: PropTypes.string,
  };

  static defaultProps = {
    as: Button,
  };

  render() {
    const {
      ShadowPrefix,
      split,
      className,
      children,
      childShadowPrefix,
      as: Component,
      ...props
    } = this.props;

    if (childShadowPrefix !== undefined) {
      props.ShadowPrefix = childShadowPrefix;
    }

    return (
      <BaseDropdownToggle>
        {({ toggle, props: toggleProps }) => (
          <Component
            onClick={toggle}
            className={classNames(
              className,
              ShadowPrefix,
              split && `${ShadowPrefix}-split`,
            )}
            {...wrapRef(toggleProps)}
            {...props}
          >
            {children}
          </Component>
        )}
      </BaseDropdownToggle>
    );
  }
}

export default createShadowComponent(DropdownToggle, 'dropdown-toggle');
