import classNames from 'classnames';
import React from 'react';

import camelize from 'dom-helpers/util/camelize';
import { useShadowPrefix} from '../ThemeProvider';

const pascalCase = str => str[0].toUpperCase() + camelize(str).slice(1);

export default function createWithShadowPrefix(
  prefix,
  { displayName = pascalCase(prefix), Component = 'div', defaultProps } = {},
) {
  const ShadowComponent = React.forwardRef(
  
    ({ className, ShadowPrefix, as: Tag = Component, ...props }, ref) => {
      const resolvedPrefix = useShadowPrefix(ShadowPrefix, prefix);
      return (
        <Tag
          ref={ref}
          className={classNames(className, resolvedPrefix)}
          {...props}
        />
      );
    },
  );
  ShadowComponent.defaultProps = defaultProps;
  ShadowComponent.displayName = displayName;
  return ShadowComponent;
}
