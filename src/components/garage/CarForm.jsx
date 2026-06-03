import { useState } from 'react';
import ColorPicker from '../shared/ColorPicker';
import styles from './CarForm.module.css';

export default function CarForm({
  buttonLabel,
  onSubmit,
  disabled = false,
  initialName = '',
  initialColor = '#ffffff',
}) {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim(), color);
    setName('');
    setColor('#ffffff');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Car name"
        value={name}
        onChange={(e) => { setName(e.target.value); }}
        disabled={disabled}
        maxLength={50}
      />
      <ColorPicker value={color} onChange={setColor} />
      <button className={styles.button} type="submit" disabled={disabled}>
        {buttonLabel}
      </button>
    </form>
  );
}
