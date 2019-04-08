// Color picker component
const COLORS = [
  {hex: '#000000', name: 'Black'},
  {hex: '#EF4437', name: 'Red'},
  {hex: '#E71F63', name: 'Pink'},
  {hex: '#8F3E97', name: 'Purple'},
  {hex: '#65499D', name: 'Deep Purple'},
  {hex: '#4554A4', name: 'Indigo'},
  {hex: '#2083C5', name: 'Blue'},
  {hex: '#35A4DC', name: 'Light Blue'},
  {hex: '#09BCD3', name: 'Cyan'},
  {hex: '#009688', name: 'Teal'},
  {hex: '#43A047', name: 'Green'},
  {hex: '#8BC34A', name: 'Light Green'},
  {hex: '#FDC010', name: 'Yellow'},
  {hex: '#F8971C', name: 'Orange'},
  {hex: '#F0592B', name: 'Deep Orange'},
  {hex: '#F06291', name: 'Light Pink'}
];

export default function initColorPicker(el, value, onChange) {
  function getNameFromHex(hex) {
    for (let color of COLORS) {
      if (color.hex === hex) {
        return color.name;
      }
    }
  }

  function setColor(hex, name, fireOnChange = true) {
    a.setAttribute('data-color', hex);
    a.setAttribute('data-name', name);
    a.setAttribute('title', name);
    a.style.background = hex;
    if (fireOnChange && typeof onChange === 'function') {
      onChange(hex);
    }
    closePicker();
  }

  function togglePicker() {
    if (isPickerOpen) {
      closePicker();
    }
    else {
      openPicker();
    }
  }

  function closePicker() {
    document.removeEventListener('keyup', handleDocumentKeyup);
    if (picker && picker.parentNode) {
      picker.parentNode.removeChild(picker);
    }
    isPickerOpen = false;
    a.focus();
  }

  function openPicker() {
    if (!picker) {
      picker = document.createElement('div');
      picker.style.background = '#fff';
      picker.style.border = '1px solid #ccc';
      picker.style.padding = '2px';
      picker.style.position = 'absolute';
      picker.style.width = '122px';
      el.style.position = 'relative';

      COLORS.map(createColorOption).forEach((c) => {
        c.style.margin = '2px';
        c.onclick = function() {
          setColor(c.getAttribute('data-color'), c.getAttribute('data-name'));
        };
        picker.appendChild(c);
      });
    }

    document.addEventListener('keyup', handleDocumentKeyup);
    el.appendChild(picker);
    isPickerOpen = true;
  }

  function createColorOption(color) {
    let e = document.createElement('a');
    e.className = 'color';
    e.setAttribute('href', 'javascript://');
    e.setAttribute('title', color.name);
    e.setAttribute('data-name', color.name);
    e.setAttribute('data-color', color.hex);
    e.style.background = color.hex;
    return e;
  }

  function handleDocumentKeyup(e) {
    if (e.keyCode === 27) {
      closePicker();
    }
  }

  let picker;
  let isPickerOpen = false;
  let name = getNameFromHex(value);
  let a = createColorOption({hex: value, name: name});
  a.onclick = togglePicker;
  el.appendChild(a);
  setColor(value, name, false);
}
