import React from 'react';
import checkImage from '../../assets/icons/check.png';

export default function OnlyWithAudioCheckbox({ value, onChange }) {
  const handleConnectionTypeChange = (event) => {
    onChange(!value);
  };

  return (
    <div className="checkbox_container">
      <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
        {value && (
          <img className="checkbox_image" src={checkImage} alt="check" />
        )}
      </div>
      <p className="checkbox_container_paragraph">Only audio</p>
    </div>
  );
}
