import React from 'react';
import list from 'Assets/list.png';
import headingExample from 'Assets/headingExample.png';
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
            <a href="https://twisted-wonderland.fandom.com/wiki/Category:Story_Background_Images">
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
          In the Text tab, you can mark the place the translation note refers to
          with a marker like this:
        </p>
        <blockquote>
          Izumi: I don’t know if they’re Eden or oden[1] or what, but we can’t
          let them have their way in our territory[2].
        </blockquote>
        <p>
          You can have markers in the middle or end of the line, or even
          multiple markers in one line if needed.
        </p>
        <p>
          In the TL Notes tab, here&apos;s an example of how the notes should be
          formatted:
        </p>
        <blockquote>
          <ol>
            <li>Place translator notes in a numbered list like this.</li>
            <li>Make sure the numbers correspond to each marker!</li>
          </ol>
        </blockquote>
        <ul>
          <li>
            The formatter identifies TL notes by looking for numbers at the
            beginning of a paragraph.
          </li>
          <li>
            <strong>
              The TL notes can also be in an actual ordered list, which is
              preferable.
            </strong>{' '}
            You can use the editor to format the list:
          </li>
          <img alt="how to create the list with the editor" src={list} />
        </ul>
      </div>
      <footer />
    </>
  );
}
