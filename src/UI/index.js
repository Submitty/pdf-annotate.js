import { disableArrow, enableArrow, setArrow } from './arrow';
import { addCircle, disableCircle, enableCircle, setCircle } from './circle';
import {
  createEditOverlay,
  destroyEditOverlay,
  disableEdit,
  enableEdit
} from './edit';
import { disableEraser, enableEraser } from './eraser';
import {
  addEventListener,
  disableUI,
  enableUI,
  fireEvent,
  removeAllEventListener,
  removeEventListener
} from './event';
import { createPage, renderPage } from './page';
import { disablePen, enablePen, setPen } from './pen';
import { disablePoint, enablePoint } from './point';
import { disableRect, enableRect } from './rect';
import { disableText, enableText, setText } from './text';

export default {
  addEventListener,
  removeEventListener,
  fireEvent,
  removeAllEventListener,
  enableUI,
  disableUI,

  disableEdit,
  enableEdit,
  createEditOverlay,
  destroyEditOverlay,

  disablePen,
  enablePen,
  setPen,

  disablePoint,
  enablePoint,

  disableRect,
  enableRect,

  disableCircle,
  enableCircle,
  setCircle,
  addCircle,

  disableArrow,
  enableArrow,
  setArrow,

  disableEraser,
  enableEraser,

  disableText,
  enableText,
  setText,

  createPage,
  renderPage
};
