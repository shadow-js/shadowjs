import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SelectableContext from './SelectableContext';
import AccordionContext from './AccordionContext';

const propTypes = {

  as: PropTypes.elementType,

  eventKey: PropTypes.string.isRequired,

 
  onClick: PropTypes.func,

  
  children: PropTypes.element,
};

const AccordionToggle = React.forwardRef(
  (
    {
      as: Component = 'button',
      children,
      eventKey,
      onClick,
      ...props
    },
    ref,
  ) => {
    const contextEventKey = useContext(AccordionContext);
    const onSelect = useContext(SelectableContext);

    return (
      <Component
        ref={ref}
        onClick={e => {
         
          let eventKeyPassed = eventKey === contextEventKey ? null : eventKey;

          onSelect(eventKeyPassed, e);
          if (onClick) onClick(e);
        }}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

AccordionToggle.propTypes = propTypes;

export default AccordionToggle;
