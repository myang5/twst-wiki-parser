import { capitalize } from 'lodash';
import extractBr from './extractBr';
import convertEditorDataToDom from './convertEditorDataToDom';

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
    // NOTE: current code will not work properly if
    // character name has a space
    let name = line.split(' ')[0];
    if (name.includes(':') && name.toUpperCase() !== 'HEADING:') {
      name = name.slice(0, name.indexOf(':')); // get text up until colon
      name = capitalize(name);
      names[name] = '';
    }
  });
  return names;
}
