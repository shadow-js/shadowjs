import createWithShadowPrefix from './utils/createWithPrefix';

import FigureImage from './FigureImage';
import FigureCaption from './FigureCaption';

const Figure = createWithShadowPrefix('figure', {
  Component: 'figure',
});

Figure.Image = FigureImage;
Figure.Caption = FigureCaption;
export default Figure;
