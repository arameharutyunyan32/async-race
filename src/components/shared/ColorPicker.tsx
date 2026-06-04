import styles from './ColorPicker.module.css';

interface Props {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ value, onChange }: Props) {
  return (
    <input
      type="color"
      value={value}
      onChange={(e) => { onChange(e.target.value); }}
      className={styles.picker}
    />
  );
}
