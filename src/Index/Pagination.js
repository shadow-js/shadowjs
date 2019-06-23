import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { createShadowComponent } from './ThemeProvider';
import PageItem, { First, Prev, Ellipsis, Next, Last } from './PageItem';

/**
 * @property {PageItem} Item
 * @property {PageItem} First
 * @property {PageItem} Prev
 * @property {PageItem} Ellipsis
 * @property {PageItem} Next
 * @property {PageItem} Last
 */
class Pagination extends React.Component {
  static propTypes = {
    /** @default 'pagination' */
    ShadowPrefix: PropTypes.string.isRequired,

    /**
     * Set's the size of all PageItems.
     *
     * @type {('sm'|'lg')}
     */
    size: PropTypes.string,
  };

  render() {
    const { ShadowPrefix, className, children, size, ...props } = this.props;

    return (
      <ul
        {...props}
        className={classNames(
          className,
          ShadowPrefix,
          size && `${ShadowPrefix}-${size}`,
        )}
      >
        {children}
      </ul>
    );
  }
}

const DecoratedPagination = createShadowComponent(Pagination, 'shadow-pagination');

DecoratedPagination.First = First;
DecoratedPagination.Prev = Prev;
DecoratedPagination.Ellipsis = Ellipsis;
DecoratedPagination.Item = PageItem;
DecoratedPagination.Next = Next;
DecoratedPagination.Last = Last;

export default DecoratedPagination;
