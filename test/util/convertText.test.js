import { DETAILS_KEYS, STORY_TYPES } from '../../src/constants';
import convertText from '../../src/utils/convertText';

/*
How formatter converts text (a rough summary)
Types of lines:
 Filename (for images) - formatter checks if file extension like .png exists in line
 (since this probably wouldn't show up in a dialogue line)
 Dialogue line (no label) - formatter checks if first word has no colon.
 Formatter assumes label-less lines that aren't filenames are dialogue lines
 Heading: label
 Name: label
Formatter identifies labels by checking if first word has a colon character (str.split(' '))
Formatter assumes the label is only one word long
Formatter assumes all the other words are part of the line/heading

need to account for text styling and how it might interfere with parsing
code has to handle partial line styling and whole line styling
TLers may paste code from their dreamwidth accounts where they bold/italicize names/headings
case 1: no styling, <p> only contains text
case 3: styling on non-label lines
case 3a: styling on filenames ex. <p><strong>filename</strong></p>
case 3b: styling in dialogue lines (probably intentional) ex. <p><strong>dialogue line</strong></p>
case 3c: partial styling on dialogue lines ex. <p>dialogue <strong>line</strong></p>
case 4: styling on label lines
case 4a: styling on labels ex. <p><strong>Ritsu:</strong> dialogue line</p>
case 4b: styling on informational headings <p><strong>Location: Hallway</strong</p>
case 4c: other partial styling variations

What styling should be kept?
Only styling on the dialogue lines (excluding labels)
How to detect dialogue line styling vs. other styling?
Evaluate <p>.innerText and then decide from there
*/

describe.skip('convertText', () => {
  let inputData;
  let tlNotesData;
  let renders;
  let details;

  beforeEach(() => {
    inputData =
      '<p>Part 1</p><p>Bg 64207.png</p><p>Location: Dwarfs’ Mine - Campsite</p><p>Heading: —Day 2: Camp Vargas.</p><p>Jamil: This is a line said by Jamil (the line starts with his name followed by a colon).</p><p>This is another line said by Jamil.</p><p>Part 2</p><p>Floyd: This is a line said by Floyd instead <strong>with some emphasis.</strong></p><p>Some Random NPC: Hello</p>';
    tlNotesData =
      '<p>If this is your first time using the formatter, please check the <a href="./howto.html#tlNotesSection">Text Guidelines</a> for how to add translation notes.</p>';
    renders = {
      Jamil: 'Jamil School',
      Floyd: 'Floyd School',
    };
    details = {
      [DETAILS_KEYS.STORY_TYPE]: STORY_TYPES.PERSONAL_STORY,
      [DETAILS_KEYS.TRANSLATOR]: 'Mandy',
      [DETAILS_KEYS.TL_LINK]: 'https://mandytl.dreamwidth.org/28341.html',
      [DETAILS_KEYS.TITLE]: 'Test Title',
      [DETAILS_KEYS.FEATURED_CHARACTER]: 'FLOYD',
    };
  });

  test('still works', () => {
    const expected = `{{Personal Story Tabs/Floyd}}
{{FanTL|tl=[https://mandytl.dreamwidth.org/28341.html Mandy]|story}}
{| class="storytable imgfit" width="100%" style="text-align:left"
|- id="Top"
! colspan="3" |Test Title
|}
<div class="themedtabber imgtabber" align="center"><Tabber>
Part 1=
{| class="storytable imgfit" width="100%" style="text-align:left"
|-
| colspan="3" |[[File:Bg 64207.png]]
|-
| colspan="3" class="secondaryheader"|Dwarfs’ Mine - Campsite
|-
| colspan="3" style="text-align:center;padding:2em"|—Day 2: Camp Vargas.
|-
|{{Story Character|Jamil School}}
| colspan="2" |This is a line said by Jamil (the line starts with his name followed by a colon).

This is another line said by Jamil.

|-
| colspan="3" class="bottomnav" |✦ [[Floyd Leech/Personal Story|Main]] ✦
|-
| colspan="3" style="text-align:center;" |[[#Top|Jump to top]]
|-
|}
|-|Part 2=
{| class="storytable imgfit" width="100%" style="text-align:left"
|-
|{{Story Character|Floyd School}}
| colspan="2" |This is a line said by Floyd instead '''with some emphasis.'''
|-
| class="character" style="padding:3em" |Some Random NPC
| colspan="2" |Hello
|-
| colspan="3" class="bottomnav" |✦ [[Floyd Leech/Personal Story|Main]] ✦
|-
| colspan="3" style="text-align:center;" |[[#Top|Jump to top]]
|-
|}
</Tabber></div>

[[Category:Personal Story]]
[[Category:Floyd Leech]]
[[Category:Jamil Viper Appearances]]
[[Category:Floyd Leech Appearances]]`;
    const output = convertText({
      inputData,
      tlNotesData,
      renders,
      details,
      onChangeDetails: () => {},
    });
    expect(output).toEqual(expected);
  });
});
