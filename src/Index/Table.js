import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { createShadowComponent } from './ThemeProvider';

class Table extends React.Component {
  static propTypes = {
    /**
     * @default 'table'
     */
    ShadowPrefix: PropTypes.string,

    /**
     * Adds zebra-striping to any table row within the `<tbody>`.
     */
    striped: PropTypes.bool,

    /**
     * Adds borders on all sides of the table and cells.
     */
    bordered: PropTypes.bool,

    /**
     * Removes all borders on the table and cells, including table header.
     */
    borderless: PropTypes.bool,

    /**
     * Enable a hover state on table rows within a `<tbody>`.
     */
    hover: PropTypes.bool,

    /**
     * Make tables more compact by cutting cell padding in half by setting
     * size as `sm`.
     */
    size: PropTypes.string,

    /**
     * Invert the colors of the table — with light text on dark backgrounds
     * by setting variant as `dark`.
     */
    variant: PropTypes.string,

    /**
     * Responsive tables allow tables to be scrolled horizontally with ease.
     * Across every breakpoint, use `responsive` for horizontally
     * scrolling tables. Responsive tables are wrapped automatically in a `div`.
     * Use `responsive="sm"`, `responsive="md"`, `responsive="lg"`, or
     * `responsive="xl"` as needed to create responsive tables up to
     * a particular breakpoint. From that breakpoint and up, the table will
     * behave normally and not scroll horizontally.
     */
    responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  };

  render() {
    const {
      ShadowPrefix,
      className,
      striped,
      bordered,
      borderless,
      hover,
      size,
      variant,
      responsive,
      ...props
    } = this.props;

    const classes = classNames(
      ShadowPrefix,
      className,
      variant && `${ShadowPrefix}-${variant}`,
      size && `${ShadowPrefix}-${size}`,
      striped && `${ShadowPrefix}-striped`,
      bordered && `${ShadowPrefix}-bordered`,
      borderless && `${ShadowPrefix}-borderless`,
      hover && `${ShadowPrefix}-hover`,
    );

    const table = <table {...props} className={classes} />;

    if (responsive) {
      let responsiveClass = `${ShadowPrefix}-responsive`;
      if (typeof responsive === 'string') {
        responsiveClass = `${responsiveClass}-${responsive}`;
      }

      return <div className={responsiveClass}>{table}</div>;
    }

    return table;
  }
}

export default createShadowComponent(Table, 'table');
