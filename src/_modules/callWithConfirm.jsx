import ReactDOM from 'react-dom';
import React from 'react';
import { Confirm } from '../popup/Components/Confirm';

/**
 * Function that calls another one after that one is confirmed
 * @param {string} question enum: bookmarkAll | closeTabs
 * @param {function} onTrue Function wrapped in () => {}
 * @param {function} onFalse Function wrapped in () => {}
 * @param  {...string} args
 * @todo tests!
 */
export const callWithConfirm = (question, onTrue, onFalse, ...args) => {
  const questions = {
    bookmarkAll: `Are you sure you want to add ${args[0]} tabs to "${args[1]}" folder in bookmarks and close them?`,
    closeTabs: `Are you sure you want to close ${args[0]} tabs?`,
  };

  const portalRoot = document.querySelector('#main-container');
  const portalElement = document.createElement('div');

  const handleConfirm = () => {
    onTrue();
    portalRoot.removeChild(portalElement);
  };

  const handleCancel = () => {
    onFalse();
    portalRoot.removeChild(portalElement);
  };

  ReactDOM.render(
    <Confirm message={questions[question]} onConfirm={handleConfirm} onCancel={handleCancel} />,
    portalRoot.appendChild(portalElement),
  );
};
