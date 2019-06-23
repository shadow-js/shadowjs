import classNames from 'classnames';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BaseDropdown from 'react-overlays/Dropdown';
import useUncontrolled from 'uncontrollable/hook';
import useEventCallback from '@restart/hooks/useEventCallback';

import { useShadowPrefix } from './ThemeProvider';
import DropdownMenu from './DropdownMenu';
import DropdownToggle from './DropdownToggle';
import DropdownItem from './DropdownItem';
import SelectableContext from './SelectableContext';
import createWithShadowPrefix from './utils/createWithPrefix';

const propTypes = {
  /** @default 'dropdown' */
  ShadowPrefix: PropTypes.string,
  
  drop: PropTypes.oneOf(['up', 'left', 'right', 'down']),

  as: PropTypes.elementType,

  alignRight: PropTypes.bool,

  
  show: PropTypes.bool,

  
  flip: PropTypes.bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(
   *   isOpen: boolean,
   *   event: SyntheticEvent,
   *   metadata: {
   *     source: 'select' | 'click' | 'rootClose' | 'keydown'
   *   }
   * ): void
   * ```
   *
   * @controllable show
   */
  onToggle: PropTypes.func,

  /**
   * A callback fired when a menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: PropTypes.func,

 
  focusFirstItemOnShow: PropTypes.oneOf([false, true, 'keyboard']),


  navbar: PropTypes.bool,
};

const defaultProps = {
  navbar: false,
};

const Dropdown = React.forwardRef((uncontrolledProps, ref) => {
  const {
    ShadowPrefix,
    drop,
    show,
    className,
    alignRight,
    onSelect,
    onToggle,
    focusFirstItemOnShow,
     as: Component = 'div',
    navbar: _4,
    ...props
  } = useUncontrolled(uncontrolledProps, { show: 'onToggle' });

  const onSelectCtx = useContext(SelectableContext);
  const prefix = useShadowPrefix(ShadowPrefix, 'shadow-dropdown');

  const handleToggle = useEventCallback(
    (nextShow, event, source = event.type) => {
      if (event.currentTarget === document) source = 'rootClose';
      onToggle(nextShow, event, { source });
    },
  );

  const handleSelect = useEventCallback((key, event) => {
    if (onSelectCtx) onSelectCtx(key, event);
    if (onSelect) onSelect(key, event);
    handleToggle(false, event, 'select');
  });

  return (
    <SelectableContext.Provider value={handleSelect}>
      <BaseDropdown.ControlledComponent
        drop={drop}
        show={show}
        alignEnd={alignRight}
        onToggle={handleToggle}
        focusFirstItemOnShow={focusFirstItemOnShow}
        itemSelector={`.${prefix}-item:not(.disabled):not(:disabled)`}
      >
        {({ props: dropdownProps }) => (
          <Component
            {...props}
            {...dropdownProps}
            ref={ref}
            className={classNames(
              className,
              show && 'show',
              (!drop || drop === 'down') && prefix,
              drop === 'up' && 'dropup',
              drop === 'right' && 'dropright',
              drop === 'left' && 'dropleft',
            )}
          />
        )}
      </BaseDropdown.ControlledComponent>
    </SelectableContext.Provider>
  );
});

Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

Dropdown.Header = createWithShadowPrefix('dropdown-header', {
  defaultProps: { role: 'heading' },
});
Dropdown.Divider = createWithShadowPrefix('dropdown-divider', {
  defaultProps: { role: 'separator' },
});

export default Dropdown;
