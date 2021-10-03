import React from 'react';
import { Link } from 'react-router-dom';
import './Header.less';

export default function Header() {
  const desc = (
    <>
      A website to more easily upload stories from the mobile game Twisted
      Wonderland to the wiki.
      <br />
      It formats your story chapter into text that can be pasted directly into
      the &quot;source&quot; section of the page.
    </>
  );

  return (
    <header>
      <h1>
        <Link className="star-link" to="/">
          TWISTED WONDERLAND STORY FORMATTER
        </Link>
      </h1>
      <div className="horizontal">
        <p>{desc}</p>
        <ul id="navbar">
          <li>
            <Link className="star-link" to="/howto">
              HOW TO USE
            </Link>
          </li>
          <li>
            <a
              className="star-link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/myang5/twst-wiki-parser/issues"
            >
              KNOWN ISSUES
            </a>
          </li>
          <li>
            <a
              className="star-link"
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/gayandasleep"
            >
              CONTACT
            </a>
          </li>
          <li>
            <a
              className="star-link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/myang5/twst-wiki-parser"
            >
              GITHUB
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
