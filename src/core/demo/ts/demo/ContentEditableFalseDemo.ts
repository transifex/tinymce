// tslint:disable:no-console
import { console, document } from '@ephox/dom-globals';
import Editor from 'tinymce/core/api/Editor';

declare const window: any;
declare let tinymce: any;

export default function () {

  const paintClientRect = function (rect, color, id) {
    const editor: Editor = tinymce.activeEditor;
    const $ = editor.$;
    let rectDiv;
    const viewPort = editor.dom.getViewPort();

    if (!rect) {
      return;
    }

    color = color || 'red';
    id = id || color;
    rectDiv = $('#' + id);

    if (!rectDiv[0]) {
      rectDiv = $('<div></div>').appendTo(editor.getBody());
    }

    rectDiv.attr('id', id).css({
      position: 'absolute',
      left: (rect.left + viewPort.x) + 'px',
      top: (rect.top + viewPort.y) + 'px',
      width: (rect.width || 1) + 'px',
      height: rect.height + 'px',
      background: color,
      opacity: 0.8
    });
  };

  const paintClientRects = function (rects, color) {
    tinymce.util.Tools.each(rects, function (rect, index) {
      paintClientRect(rect, color, color + index);
    });
  };

  const logPos = function (caretPosition) {
    const container = caretPosition.container(),
      offset = caretPosition.offset();

    if (container.nodeType === 3) {
      if (container.data[offset]) {
        console.log(container.data[offset]);
      } else {
        console.log('<end of text node>');
      }
    } else {
      console.log(container, offset, caretPosition.getNode());
    }
  };

  window.paintClientRect = paintClientRect;
  window.paintClientRects = paintClientRects;
  window.logPos = logPos;

  tinymce.init({
    selector: '#tinymce1',
    toolbar: false,
    statusbar: false,
    menubar: false,
    skin: false,
    plugins: 'paste noneditable',
    paste_as_text: true,
    smart_paste: false,
    theme: false,
    forced_root_block: false,
    root_block: 'div',
    inline: true,
    visual: false,
    browser_spellcheck: true,
    content_css: '../css/content_editable.css',
    height: 400,
  });

  tinymce.init({
    selector: '#tinymce2',
    toolbar: false,
    statusbar: false,
    menubar: false,
    skin: false,
    plugins: 'paste noneditable',
    paste_as_text: true,
    smart_paste: false,
    theme: false,
    forced_root_block: false,
    root_block: 'div',
    inline: true,
    visual: false,
    browser_spellcheck: true,
    content_css: '../css/content_editable.css',
    // directionality: 'rtl',
    // force_rtl: true,
  });
  tinymce.init({
    selector: '#tinymce3',
    toolbar: false,
    statusbar: false,
    menubar: false,
    skin: false,
    plugins: 'paste noneditable',
    paste_as_text: true,
    smart_paste: false,
    theme: false,
    forced_root_block: false,
    root_block: 'div',
    inline: true,
    visual: false,
    browser_spellcheck: true,
    content_css: '../css/content_editable.css',
    directionality: 'rtl',
  });

  tinymce.init({
    selector: '#tinymce4',
    toolbar: false,
    statusbar: false,
    menubar: false,
    skin: false,
    plugins: 'paste noneditable',
    paste_as_text: true,
    smart_paste: false,
    theme: false,
    forced_root_block: false,
    root_block: 'div',
    inline: true,
    visual: false,
    browser_spellcheck: true,
    content_css: '../css/content_editable.css',
    directionality: 'ltr'
  });

  tinymce.init({
    selector: '#tinymce5',
    toolbar: false,
    statusbar: false,
    menubar: false,
    skin: false,
    plugins: 'paste noneditable',
    paste_as_text: true,
    smart_paste: false,
    theme: false,
    forced_root_block: false,
    root_block: 'div',
    inline: true,
    visual: false,
    browser_spellcheck: true,
    content_css: '../css/content_editable.css',
    directionality: 'rtl'
  });

  const button = document.createElement('button');
  button.innerHTML = 'Toggle Directionality';
  button.addEventListener('click', () => {
    const c = tinymce.activeEditor.settings.directionality;
    if (c === 'rtl') {
      tinymce.activeEditor.settings.directionality = 'ltr';
    } else {
      tinymce.activeEditor.settings.directionality = 'rtl';
    }
    // tslint:disable no-console
    console.log(tinymce.activeEditor.settings.directionality);
    // tslint:enable no-console
  });
  document.body.appendChild(button);
  window.tinymce = tinymce;
}
