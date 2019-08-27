import React from 'react';

class AppButton extends React.Component {
  render() {
    let { purpose, buttonText, buttonIcon, buttonCssModifierClass, buttonType } = this.props;
    return (
      <button
        className={`bank-catalog__button ${buttonCssModifierClass}`}
        onClick={purpose}
        type={buttonType}>
        {buttonIcon}
        {buttonText && <span className="button-mutate__text">{buttonText}</span>}
      </button>
    );
  }
}

export default AppButton;