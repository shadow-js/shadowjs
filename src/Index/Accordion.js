import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import useUncontrolled from 'uncontrollable/hook';
import { useShadowPrefix } from './ThemeProvider';
import AccordionToggle from './AccordionToggle';
import SelectableContext from './SelectableContext';
import AccordionCollapse from './AccordionCollapse';
import AccordionContext from './AccordionContext';

const propTypes = {

  as: PropTypes.elementType,

  ShadowPrefix: PropTypes.string,

 
  activeKey: PropTypes.string,

  
  defaultActiveKey: PropTypes.string,
};

const Accordion = React.forwardRef((props, ref) => {
  let {
    as: Component = 'div',
    activeKey,
    ShadowPrefix,
    children,
    className,
    onSelect,
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect',
  });

  ShadowPrefix = useShadowPrefix(ShadowPrefix, 'accordion');

  return (
    <AccordionContext.Provider value={activeKey}>
      <SelectableContext.Provider value={onSelect}>
        <Component
          ref={ref}
          {...controlledProps}
          className={classNames(className, ShadowPrefix)}
        >
          {children}
        </Component>
      </SelectableContext.Provider>
    </AccordionContext.Provider>
  );
});

Accordion.propTypes = propTypes;

Accordion.Toggle = AccordionToggle;
Accordion.Collapse = AccordionCollapse;

export default Accordion;
