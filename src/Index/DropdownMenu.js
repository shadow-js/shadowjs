import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import BaseDropdownMenu from 'react-overlays/DropdownMenu';
import NavbarContext from './NavbarContext';

import { useShadowPrefix } from './ThemeProvider';

const wrapRef = props => {
  const { ref } = props;
  props.ref = ref.__wrapped || (ref.__wrapped = r => ref(findDOMNode(r)));
  return props;
};

const propTypes = {
  
  ShadowPrefix: PropTypes.string,

 
  show: PropTypes.bool,

  
  flip: PropTypes.bool,

  
  alignRight: PropTypes.bool,

  onSelect: PropTypes.func,

  rootCloseEvent: PropTypes.oneOf(['click', 'mousedown']),

  as: PropTypes.elementType,

  
  popperConfig: PropTypes.object,
};

const defaultProps = {
  alignRight: false,
  flip: true,
};

const DropdownMenu = React.forwardRef(
  (
    {
      ShadowPrefix,
      className,
      alignRight,
      rootCloseEvent,
      flip,
      popperConfig,
      show: showProps,
        as: Component = 'div',
      ...props
    },
    ref,
  ) => {
    const isNavbar = useContext(NavbarContext);
    const prefix = useShadowPrefix(ShadowPrefix, 'shadow-dropdown-menu');

    return (
      <BaseDropdownMenu
        ref={ref} 
        flip={flip}
        show={showProps}
        alignEnd={alignRight}
        usePopper={!isNavbar}
        popperConfig={popperConfig}
        rootCloseEvent={rootCloseEvent}
      >
        {({ placement, show, alignEnd, close, props: menuProps }) => {
          wrapRef(menuProps);
         
          if (typeof Component !== 'string') {
            menuProps.show = show;
            menuProps.close = close;
            menuProps.alignRight = alignEnd;
          }
          let style = props.style;
          if (placement) {
            
            style = { ...style, ...menuProps.style };
            props['x-placement'] = placement;
          }
          return (
            <Component
              {...props}
              {...menuProps}
              style={style}
              className={classNames(
                className,
                prefix,
                show && 'show',
                alignEnd && `${prefix}-right`,
              )}
            />
          );
        }}
      </BaseDropdownMenu>
    );
  },
);

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
