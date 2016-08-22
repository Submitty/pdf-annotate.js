import { addEventListener, removeEventListener, fireEvent } from './event';
import { disableEdit, enableEdit } from './edit';
import { disablePen, enablePen, setPen } from './pen';
import { disableArrow, enableArrow, setArrow } from './arrow';
import { disablePoint, enablePoint } from './point';
import { disableRect, enableRect } from './rect';
import { disableCirle, enableCircle } from './circle';
import { disableText, enableText, setText } from './text';
import { createPage, renderPage } from './page';

export default {
  addEventListener, removeEventListener, fireEvent,
  disableEdit, enableEdit,
  disablePen, enablePen, setPen,
  disablePoint, enablePoint,
  disableRect, enableRect,
  disableCirle,enableCircle,
  disableArrow, enableArrow,
  disableText, enableText, setText,
  createPage, renderPage
};
