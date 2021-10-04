import React from 'react';
import list from 'Assets/list.png';
import headingExample from 'Assets/headingExample.png';
import partExample from 'Assets/partExample.png';
import './HowTo.less';

export default function HowTo() {
  return (
    <>
      <div className="how-to-page">
        <h2>TEXT GUIDELINES</h2>
        <h3>Text Tab</h3>
        <p>Copy and paste your translated chapter into the text box.</p>
        <ul>
          <li>
            <strong>Background images</strong> - You can include whole-row
            images by inserting the EXACT file name &#40;ex. Bg 10101.png&#41;
            into the dialogue on its own line. A list of all background images
            can be found here:{' '}
            <a href="https://twistedwonderland.miraheze.org/wiki/Category:Story_Background_Images">
              Story Background Images
            </a>
          </li>
          <li>
            <strong>Headings</strong> - You can indicate scene changes in the
            dialogue by including a line that starts with &quot;Location:&quot;,
            and mid-dialogue headings with a line that starts with
            &quot;Heading:&quot;. For example, the following text:
            <blockquote>
              Location: Dwarfs’ Mine - Campsite <br />
              Heading: —Day 2: Camp Vargas.
            </blockquote>
            will result in: <br />
            <img alt="Heading types example" src={headingExample} />
          </li>
          <li>
            <strong>Bold and italic text</strong> - Bold and italic text should
            be preserved when pasted in from a Word/Google document.
          </li>
          <li>
            <strong>Links</strong> - Links should also be preserved when pasted
            in. Make sure every link is like an external one &#40;i.e. with the
            https:// in front&#41;.
          </li>
          <li>
            <strong>Stories with multiple parts</strong> - To indicate that the
            story needs to be tabbed out into multiple parts like this:
            <br />
            <img alt="Different parts example" src={partExample} />
            <br />
            use a line that says &quot;Part 1&quot;, &quot;Part 2&quot;, etc. to
            indicate the dialogue following the line is in its own part:
            <blockquote>
              Part 1<br />
              Character: Some dialogue
              <br />
              Part 2<br />
              Character: Some more dialogue
            </blockquote>
            If a story only has one part, do not specify &quot;Part 1&quot; in
            the text or the formatter will unnecessarily add code for the parts
            tabber.
          </li>
        </ul>
        <p>Here&apos;s an example of a short dialogue:</p>
        <blockquote>
          Bg 61291.png
          <br />
          Location: Sports Field
          <br />
          <strong>Person A:</strong> This is a line said by Person A! Their line
          starts with their name followed by a colon.
          <br />
          <strong>Person B:</strong> This is a line said by another person!
          <br />
          Heading: —A few days later. <br />
          <strong>Person A:</strong> This is a third line from Person A.
        </blockquote>
        <p>
          When characters have multiple lines at in a row, the following
          dialogue formats are accepted:
        </p>
        <blockquote>
          <strong>Person A:</strong> Line by person A
          <br />
          Second line by person A (line doesn&apos;t begin with name)
          <br />
          <strong>Person B:</strong> Line by person B
          <br />
          <br />
          <strong>Person A:</strong> Line by person A
          <br />
          <strong>Person A:</strong> Second line by person A (line begins with
          name)
          <br />
          <strong>Person B:</strong> Line by person B
        </blockquote>

        <h3>Details Tab</h3>
        <p>
          Fill in information about the chapter and its appearance on the wiki.
        </p>
        <p>
          Values should auto-fill based on previous input, if you allow websites
          to cache information in your browser&apos;s local storage.
        </p>

        <h3>Renders Tab</h3>
        <p>
          The renders tab should automatically display which characters are in
          the dialogue, with a text input next to each name. Fill in the file
          names of the renders that should be used for each character. (ex.
          Leona Dorm)
        </p>
        <p>
          If the character is an NPC with no dedicated image, just leave the
          input blank and the parser will format the line with the code for
          NPCs.
        </p>
        <p>
          If you want to use more than one render per character in one chapter,
          please format each section of the chapter separately.
        </p>

        <h3 id="tlNotesSection">TL Notes Tab</h3>
        <p>
          In the Text tab, you can mark the place where translation note should
          be inserted like this:
        </p>
        <blockquote>
          Idia: Generally I hate talking face-to-face, but if I’m playing a
          BG…[1] What, you don’t know what BG means? It stands for ‘board
          game’…”[2]
        </blockquote>
        <p>
          You can have multiple markers in the middle or end of the dialogue
          line
        </p>
        <p>
          In the TL Notes tab, paste in the actual text of the translation
          notes:
        </p>
        <blockquote>
          <p>
            1. Translation notes should start with a number followed by a
            period.
          </p>
          <p>
            If a paragraph doesn't start with a number, the formatter will
            assume that the paragraph is part of the previous note.
          </p>
          <p>2. Second translation note</p>
        </blockquote>
        <ul>
          <li>
            Technically, you don't need to worry about matching the exact
            numbers in the TL note markers to the TL note text. The formatter
            will insert the TL notes in the order that they appear in the TL
            Notes tab.
          </li>
          <li>
            Just make sure that you have an equal number of markers and TL notes
            :0
          </li>
        </ul>
      </div>
      <footer />
    </>
  );
}
