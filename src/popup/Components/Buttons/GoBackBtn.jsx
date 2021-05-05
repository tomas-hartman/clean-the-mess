import React from 'react';

export default function GoBackBtn({ switchToScreen }) {
  return (<div className="back go-back" title="Back" onClick={() => switchToScreen('overview')} />);
}
