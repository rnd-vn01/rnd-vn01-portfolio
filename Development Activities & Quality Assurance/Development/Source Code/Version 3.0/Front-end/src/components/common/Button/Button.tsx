import './Button.scss';
import React from 'react';

export const Button: React.FC<IButton> = ({
  theme,
  onClick,
  logo,
  caption,
  isDisabled,
  name,
}) => {
  const themeClass = `button--${theme}`

  return (
    <button
      className={`button flex-center ${themeClass}
      ${isDisabled && "button--disabled"}`}
      onClick={() => {
        if (!isDisabled)
          onClick();
      }}
      role="button"
      aria-label={`${name ? `button-${name}` : "button"}`}
      data-testid={`${name ? `button-${name}` : "button"}`}>
      {logo && <img className="button__logo" src={logo}></img>}
      <p className="button__caption">{caption}</p>
    </button>
  );
};

Button.defaultProps = {
  theme: "blue"
}
