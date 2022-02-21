import { capitalize, compact } from 'lodash';
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

  const tlNotes = getTlNotes(tlNotesData);
  const outputObj = { output, partCount: 0, tlNotesCount: 0 };
  const formatLineHelper = formatLine({
    templates,
    renders,
    outputObj,
    storyType,
    tlNotes,
  });

  for (let i = 0; i < input.length; i++) {
    const lineResult = formatLineHelper(input[i]);
    outputObj.output += lineResult;
  }

  output = outputObj.output;

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

  if (tlNotes.length) {
    output += templates.tlNotes();
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
|{{Story Character|npc|${name}}}
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
  templates.tlNotes = () => `<references />
`;
  return templates;
};

/*
Possible TL notes format:
 1. <p> elements starting with numbers (TL notes may be multi-paragraph) though
 2. One <ol> if notes are in numbered list
*/
function getTlNotes(tlNotesData) {
  const dom = extractBr(convertEditorDataToDom(tlNotesData));
  let notes;

  formatStyling(dom);

  if (dom.body.firstChild?.tagName.toUpperCase() === 'OL') {
    let listItems = Array.from(dom.querySelectorAll('li'));
    listItems = listItems.map((item) =>
      item.textContent.replace(/&nbsp;/g, ' ').trim(),
    );
    notes = listItems;
  } else {
    // If TL notes are not in numbered list, assume they are in paragraphs
    let pElts = Array.from(dom.querySelectorAll('p'));
    const numberedRegex = /^\d+\. ?/;
    notes = [];
    pElts.forEach((p) => {
      let text = p.textContent.replace(/&nbsp;/g, ' ').trim();
      if (numberedRegex.test(text)) {
        notes.push(text.replace(numberedRegex, ''));
        return;
      }
      if (text) {
        notes[notes.length - 1] += `\n${text}`;
      }
    });
  }
  return compact(notes);
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
