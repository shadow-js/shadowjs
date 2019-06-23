import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useShadowPrefix } from './ThemeProvider';
import BreadcrumbItem from './BreadcrumbItem';

const propTypes = {
  
  ShadowPrefix: PropTypes.string,
  
  label: PropTypes.string,
  
  listProps: PropTypes.object,

  as: PropTypes.elementType,
};

const defaultProps = {
  label: 'breadcrumb',
  listProps: {},
};

const Breadcrumb = React.forwardRef(
  (
    {
      ShadowPrefix,
      className,
      listProps,
      children,
      label,
      as: Component = 'nav',
      ...props
    },
    ref,
  ) => {
    const prefix = useShadowPrefix(ShadowPrefix, 'shadow-breadcrumb');

    return (
      <Component aria-label={label} className={className} ref={ref} {...props}>
        <ol {...listProps} className={classNames(prefix, listProps.className)}>
          {children}
        </ol>
      </Component>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
