import { MouseEvent } from 'react';
import checkImage from '../../assets/icons/check.png';

interface OnlyWithAudioCheckboxProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

export default function OnlyWithAudioCheckbox({
  isChecked,
  onChange,
}: OnlyWithAudioCheckboxProps) {
  const handleConnectionTypeChange = (event: MouseEvent) => {
    onChange(!isChecked);
  };

  return (
    <div className="checkbox_container">
      <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
        {isChecked && (
          <img className="checkbox_image" src={checkImage} alt="check" />
        )}
      </div>
      <p className="checkbox_container_paragraph">Only audio</p>
    </div>
  );
}
