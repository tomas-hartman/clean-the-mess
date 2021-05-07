import React from 'react';

export default function CloseBtn(props) {
  const {
    tId, isHidden = false, isDetail = false, closeTabs,
  } = props;
  const hiddenCls = isHidden ? 'hidden' : '';

  const handleClick = () => {
    closeTabs(tId);
  };

  return (
    <button type="button" className={`remove ${isDetail} ${hiddenCls}`} title="Close tab" onClick={handleClick}>
      <span className="hidden">Close tab</span>
    </button>
  );
}
