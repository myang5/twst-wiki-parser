import React from 'react';
import { TLNotesEditor } from './CKEditor';

export default function TLNotesContent() {
  return (
    <div className="tab-content__grid">
      <span />
      <div className="row--label-only">
        <label className="label--small" htmlFor="title">
          Arbitrary title needed to make citation links work
        </label>
      </div>
      <label htmlFor="title">Chapter Title</label>
      <input type="text" id="title" />
      <label className="tab-content__tl-editor-label" htmlFor="TL Notes">
        TL Notes
      </label>
      <div className="tab-content__tl-editor">
        <TLNotesEditor />
      </div>
    </div>
  );
}
