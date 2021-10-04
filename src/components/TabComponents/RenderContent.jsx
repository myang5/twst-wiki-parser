import React, { useContext } from 'react';
import { StateContext } from '../Main/StateContext';

export default function RenderContent() {
  const { renderRef, renders, setRenders } = useContext(StateContext);

  const handleChange = (e) => {
    const newState = { ...renders, [e.target.id]: e.target.value };
    renderRef.current = newState;
    setRenders(newState);
  };

  return (
    <>
      <p>
        Please paste in the Story Character template values for each character.
        Possible values can be found in the{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twistedwonderland.miraheze.org/wiki/Template:Story_Character"
        >
          template documentation
        </a>{' '}
        (This tab will fill out once you paste dialogue into the Text tab).
        <br />
        <strong>
          Dialogue from characters with blank inputs will be formatted like
          NPCs.
        </strong>
      </p>
      <div className="tab-content__grid">
        {Object.entries(renders).map(([name, render]) => (
          <RenderRow
            key={name}
            name={name}
            value={render}
            onChange={handleChange}
          />
        ))}
      </div>
    </>
  );
}

function RenderRow({ name, value, onChange }) {
  return (
    <>
      <label htmlFor={name}>{name}</label>
      <input id={name} onChange={onChange} value={value} />
    </>
  );
}
