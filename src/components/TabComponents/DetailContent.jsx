import React, { useContext } from 'react';
import { StateContext } from '../Main/StateContext';
import { DETAILS_KEYS, STORY_TYPES } from 'Constants';

const storyTypes = Object.values(STORY_TYPES);

export default function DetailContent() {
  const { details, setDetails } = useContext(StateContext);

  const handleChange = (e) => {
    const {
      target: { id, value },
    } = e;
    setDetails({ ...details, [id]: value });
  };

  return (
    <>
      <h3>Story Details</h3>
      <div className="tab-content__grid">
        <label htmlFor={DETAILS_KEYS.STORY_TYPE}>Story Type</label>
        <select
          type="text"
          id={DETAILS_KEYS.STORY_TYPE}
          value={details[DETAILS_KEYS.STORY_TYPE]}
          onChange={handleChange}
        >
          {storyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <span />
        <div className="row--half-width row--label-only">
          <label
            className="label--small"
            id={`${DETAILS_KEYS.TRANSLATOR}-name-label`}
          >
            Name
          </label>
          <label
            className="label--small"
            id={`${DETAILS_KEYS.TL_LINK}-credit-label`}
          >
            Credit link
          </label>
        </div>
        <label id={`${DETAILS_KEYS.TRANSLATOR}-label`}>Translator</label>
        <div className="row--half-width">
          <input
            type="text"
            aria-labelledby={`${DETAILS_KEYS.TRANSLATOR}-label ${DETAILS_KEYS.TRANSLATOR}-name-label`}
            value={details[DETAILS_KEYS.TRANSLATOR]}
            id={DETAILS_KEYS.TRANSLATOR}
            onChange={handleChange}
          />
          <input
            type="text"
            aria-labelledby={`${DETAILS_KEYS.TRANSLATOR}-label ${DETAILS_KEYS.TL_LINK}-credit-label`}
            value={details[DETAILS_KEYS.TL_LINK]}
            id={DETAILS_KEYS.TL_LINK}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}
