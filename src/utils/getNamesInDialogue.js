import { includes } from 'lodash';
import extractBr from './extractBr';
import convertEditorDataToDom from './convertEditorDataToDom';
import capitalizeName from './capitalizeName';
import { RESERVED_LABELS } from '../constants';

const RESERVED_LABELS_ARRAY = Object.values(RESERVED_LABELS);

/**
 * Get the names of the characters in the current dialogue in InputArea component.
 * Used as a callback to the Autosave plugin of the InputEditor.
 * @param {String} editorData The CKEditor data as a string (returned from CKEditor.getData())
 * @return {Object} An Object with the names of the characters initialized
 * with an empty string value
 */
export default function getNamesInDialogue(editorData) {
  const inputDom = extractBr(convertEditorDataToDom(editorData));
  const lines = Array.from(
    inputDom.querySelectorAll('p'),
    (p) => p.textContent,
  );
  const names = {};
  lines.forEach((line) => {
    // TODO: Need to figure how to handle when dialogue line itself just has
    // a colon in it with no label lol
    if (line.includes(':')) {
      let name = line.split(':')[0].trim();
      if (!includes(RESERVED_LABELS_ARRAY, name.toUpperCase())) {
        names[capitalizeName(name)] = '';
      }
    }
  });
  return names;
}
