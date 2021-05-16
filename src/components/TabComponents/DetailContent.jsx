import React, { useContext } from 'react';
import { StateContext } from '../Main/StateContext';
import { DETAILS_KEYS } from 'Constants';

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
      <div className="row">
        <label className="row__spacer" htmlFor={DETAILS_KEYS.LOCATION}>
          Location
        </label>
        <input
          type="text"
          id={DETAILS_KEYS.LOCATION}
          value={details[DETAILS_KEYS.LOCATION]}
          onChange={handleChange}
        />
      </div>
      <div className="row row--label-only">
        <span className="row__spacer" />
        <label
          className="row__half-width"
          id={`${DETAILS_KEYS.TRANSLATOR}-name-label`}
        >
          Name
        </label>
        <label
          className="row__half-width"
          id={`${DETAILS_KEYS.TL_LINK}-credit-label`}
        >
          Credit link
        </label>
      </div>
      <div className="row row--person">
        <label className="row__spacer" id={`${DETAILS_KEYS.TRANSLATOR}-label`}>
          Translator
        </label>
        <input
          className="row__half-width"
          type="text"
          aria-labelledby={`${DETAILS_KEYS.TRANSLATOR}-label ${DETAILS_KEYS.TRANSLATOR}-name-label`}
          value={details[DETAILS_KEYS.TRANSLATOR]}
          id={DETAILS_KEYS.TRANSLATOR}
          onChange={handleChange}
        />
        <input
          className="row__half-width"
          type="text"
          aria-labelledby={`${DETAILS_KEYS.TRANSLATOR}-label ${DETAILS_KEYS.TL_LINK}-credit-label`}
          value={details[DETAILS_KEYS.TL_LINK]}
          id={DETAILS_KEYS.TL_LINK}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
