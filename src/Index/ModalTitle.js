import createWithShadowPrefix from './utils/createWithPrefix';
import divWithClassName from './utils/divWithClassName';

const DivStyledAsH4 = divWithClassName('h4');

export default createWithShadowPrefix('shadow-modal-title', { Component: DivStyledAsH4 });
