import { capitalize } from 'lodash';
import { DETAILS_KEYS, CATEGORY_NAMES, STORY_TYPES } from '../constants/';
import extractBr from './extractBr';
import convertEditorDataToDom from './convertEditorDataToDom';
import formatLine from './formatLine';
import formatStyling from './formatStyling';

/**
 * Formats text into source code for the wiki.
 * @return {string} The formatted text as a string to be placed in the output textarea
 */
export default function convertText({
  inputData,
  tlNotesData,
  renders,
  details,
  onChangeDetails,
}) {
  normalizeDetails(details);
  onChangeDetails({ ...details });
  const { [DETAILS_KEYS.STORY_TYPE]: storyType } = details;

  const templates = getTemplates(details);
  const inputDom = extractBr(convertEditorDataToDom(inputData));

  localStorage.setItem('details', JSON.stringify(details));

  const input = inputDom.querySelectorAll('p');

  // TODO: add header for event story
  let output =
    storyType === STORY_TYPES.PERSONAL_STORY
      ? templates.personalStoryHeader()
      : '';
  output += templates.tabberHeaderPlaceholder();

  let tlMarkerCount = 0; // keep track of count to alert user when count mismatches
  const outputObj = { output, partCount: 0 };
  const formatLineHelper = formatLine({
    templates,
    renders,
    outputObj,
    storyType,
  });

  for (let i = 0; i < input.length; i++) {
    tlMarkerCount += countTlMarkers(input[i].textContent);
    // Need to separate the next two steps so that formaLineHelper
    // is able to grab and replace output
    const lineResult = formatLineHelper(input[i]);
    outputObj.output += lineResult;
  }

  output = outputObj.output;

  if (tlMarkerCount > 0) output += formatTlNotes(tlNotesData, tlMarkerCount);

  output +=
    storyType === STORY_TYPES.PERSONAL_STORY
      ? templates.personalStoryFooter()
      : '';
  output += templates.tableEnd();

  if (output.includes(templates.tabberHeaderPlaceholder())) {
    output = output.replace(templates.tabberHeaderPlaceholder(), '');
  } else {
    // If tabber placeholder was replaced, that means the code
    // for tabberHeader was used, and tabber needs to be closed out
    output += templates.tabberFooter();
  }

  output += formatCategories(details, Object.keys(renders));

  return output;
}

/**
 * Helper function to normalize inputs from the Details tab.
 * Mutates the values directly.
 * @param {DetailsObject} details
 */
function normalizeDetails(details) {
  Object.entries(details).forEach((entry) => {
    const [key, value] = entry;
    details[key] = value.trim();
  });
}

/**
 * Helper function to format the wiki code for story header and footer
 * with the user input
 * @param {Object} details
 * @return {Object} Object containing the wikia syntax to use as templates
 */
const getTemplates = (details) => {
  const { featuredCharacter, translator, tlLink, title } = details;

  const templates = {};

  templates.personalStoryHeader = () => `{{Personal Story Tabs/${capitalize(
    featuredCharacter,
  )}}}
{{FanTL|tl=[${tlLink} ${translator}]|story}}
{| class="storytable imgfit"
|- id="Top"
! ${title}
`;
  templates.tabberHeaderPlaceholder = () => `tabber-placeholder
`;
  templates.tabberHeader =
    () => `<div class="themedtabber imgtabber" align="center"><Tabber>
`;
  templates.firstPartLine = () => `Part 1=
`;
  templates.partLine = (number) => `|-|Part ${number}=
`;
  templates.tableStart = () => `{| class="storytable imgfit"
`;
  templates.cgRender = (filename) => `|-
| colspan="3" |[[File:${filename}]]
`;
  templates.locationHeading = (location) => `|-
| colspan="3" class="secondaryheader"|${location}
`;
  templates.heading = (heading) => `|-
| colspan="3" style="text-align:center;padding:2em"|${heading}
`;
  templates.dialogueLine = (render, line) => `|-
|{{Story Character|${render}}}
| colspan="2" |${line}
`;
  templates.npcDialogueLine = (name, line) => `|-
| class="character" style="padding:3em" |${name}
| colspan="2" |${line}
`;
  templates.choice = (choice1, choice2) => `|-
| colspan="2" class="choice" |${choice1}
| class="choice" width="50%" |${choice2}
`;
  templates.personalStoryFooter = () => `|-
| colspan="3" class="bottomnav" |✦ [[${CATEGORY_NAMES[featuredCharacter]}/Personal Story|Main]] ✦
|-
| colspan="3" style="text-align:center;" |[[#Top|Jump to top]]
`;
  templates.tableEnd = () => `|}
`;
  templates.tabberFooter = () => `</Tabber></div>
`;
  return templates;
};

/**
 * Get the number of TL markers in the dialogue line
 * @param {string} line
 */

function countTlMarkers(line) {
  return line.match(/\[\d+\]/g) ? line.match(/\[\d+\]/g).length : 0;
}

/*
TL Notes tab is supposed to contain an <ol> but when TLers paste in content it usually just becomes <p>
Users don't always read instructions so need to account for user input wow i love UX design
Editor already contains 1 <p> with the default text "If this is your first time using the formatter..."
If there are TL Notes, assume there would be
 1. A second <p> starting with a number
 2. One <p> and one <ol> if notes are in numbered list
Chapter title is correctly input if:
 - first ChildNode of the editor DOM if child is <p>
 - textContent doesn't match default text or start with a number
Detect if user forgot chapter title and alert user
Get TL Notes which are the rest of the <p> elements or <li> elements
If <p> elements start with number, then new TL note
If not, then multi-paragraph TL note and add <p> content to current TL note
Only gets called if there are TL markers in the dialogue
*/
function formatTlNotes(tlNotesData, count) {
  const title = document.querySelector('#title').value;
  if (title.length > 0) {
    const dom = extractBr(convertEditorDataToDom(tlNotesData));
    let notes = [];
    if (dom.body.firstChild) {
      // if there is text in the TtlEditor
      // ERROR: this doesn't account for possible bolded numbers
      formatStyling(dom);
      // -----IF TL NOTES ARE IN <li>-----
      if (dom.body.firstChild.tagName.toUpperCase() === 'OL') {
        let listItems = Array.from(dom.querySelectorAll('li'));
        listItems = listItems.map((item) =>
          item.textContent.replace(/&nbsp;/g, ' ').trim(),
        );
        notes = listItems.filter((item) => item.trim().length > 0); // filter out empty lines
      }
      // -----IF TL NOTES ARE IN <p>-----
      else {
        let paras = Array.from(dom.querySelectorAll('p'));
        notes = paras.reduce((acc, item) => {
          let text = item.textContent.replace(/&nbsp;/g, ' ').trim();
          if (!isNaN(text[0])) {
            // ERROR: assumes the number is separated by space as in "1. note" vs. "1.note"
            acc.push(text.split(' ').slice(1).join(' '));
          } else if (text.length > 0) {
            acc[acc.length - 1] += `\n${text}`;
          }
          return acc;
        }, []);
      }
      if (notes.length !== count) {
        document.querySelector('.error').innerHTML +=
          'WARNING: The formatter detected an unequal number of TL markers and TL notes.';
      }
      let output = `|-
| colspan="2"|`;
      let tlCode = `<span id='${title}NoteNUM'>NUM.[[#${title}RefNUM|↑]] TEXT</span><br />`;
      for (let i = 0; i < notes.length; i++) {
        let newTlCode = tlCode.replace(/NUM/g, i + 1);
        output += newTlCode.replace('TEXT', notes[i]);
      }
      output = output.replace(/<br \/>$/m, '\n');
      return output;
    }
  }
  return '';
}

/**
 * Helper function to add the category tags at the end of the dialogue
 * @param {Array<string>} names An Array of character names that appear in the story
 */

export function formatCategories(details, names) {
  const {
    [DETAILS_KEYS.STORY_TYPE]: storyType,
    [DETAILS_KEYS.FEATURED_CHARACTER]: featuredCharacter,
  } = details;

  let categories = '';

  categories +=
    storyType === STORY_TYPES.PERSONAL_STORY
      ? `\n[[Category:Personal Story]]`
      : '';
  categories += featuredCharacter
    ? `\n[[Category:${CATEGORY_NAMES[featuredCharacter]}]]`
    : '';

  // ex. [[Category:Idia Shroud Appearances]]
  // If character name does not have associated appearances
  // category, character is skipped
  names.forEach((name) => {
    const fullName = CATEGORY_NAMES[name.toUpperCase()];
    categories += fullName ? `\n[[Category:${fullName} Appearances]]` : '';
  });

  return categories;
}
