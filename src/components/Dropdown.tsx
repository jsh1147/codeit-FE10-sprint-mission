import {
  useState,
  useEffect,
  ReactElement,
  FocusEvent,
  MouseEvent,
} from "react";
import "./Dropdown.css";

interface DropdownProps<Option> {
  onSelect: (value: Option) => void;
  children: ReactElement<{ value: Option; children: string }, "option">[];
}

export default function Dropdown<Option extends string>({
  onSelect,
  children,
}: DropdownProps<Option>) {
  if (!hasValidChildren()) throw new Error("Invalid Children");

  const [isActive, setIsActive] = useState<boolean>(false);
  const [value, setValue] = useState<Option>(children[0].props.value);

  function hasValidChildren() {
    return (
      children.length > 0 &&
      children.every(
        (child) =>
          child.type === "option" && child.props.value && child.props.children
      )
    );
  }

  const handleSelectClick = () => {
    setIsActive((prev) => !prev);
  };
  const handleSelectBlur = (e: FocusEvent<HTMLButtonElement>) => {
    if (e.relatedTarget?.className === "dropdown__option") return;
    setIsActive(false);
  };
  const handleOptionClick = (e: MouseEvent<HTMLButtonElement>) => {
    setValue(e.currentTarget.value as Option);
    setIsActive(false);
  };

  useEffect(() => {
    onSelect(value);
  }, [onSelect, value]);

  return (
    <div className="dropdown">
      <button
        className="dropdown__select"
        type="button"
        onClick={handleSelectClick}
        onBlur={handleSelectBlur}
      >
        {children.find((child) => value === child.props.value)?.props.children}
      </button>
      {isActive && (
        <ul className="dropdown__optionList">
          {children.map((child) => (
            <li key={child.props.value} className="dropdown__optionListItem">
              <button
                className="dropdown__option"
                type="button"
                onClick={handleOptionClick}
                value={child.props.value}
              >
                {child.props.children}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
