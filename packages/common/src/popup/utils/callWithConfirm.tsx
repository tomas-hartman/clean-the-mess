import ReactDOM from 'react-dom';
import { Confirm } from '../components/Confirm';

type Question = 'bookmarkAll' | 'closeTabs';

const getConfirmableQuestions = (question: Question, args: (string | number)[]) =>
  ({
    bookmarkAll: `Are you sure you want to add ${args[0]} tabs to "${args[1]}" folder in bookmarks and close them?`,
    closeTabs: `Are you sure you want to close ${args[0]} tabs?`,
  }[question]);

/**
 * Function that calls another one after that one is confirmed
 * @param {string} question enum: bookmarkAll | closeTabs
 * @param {function} onTrue Function wrapped in () => {}
 * @param {function} onFalse Function wrapped in () => {}
 * @param  {...string} args
 * @todo tests!
 */
export const callWithConfirm = (
  question: Question,
  onTrue: () => void,
  onFalse: () => void,
  ...args: (string | number)[]
) => {
  const portalRoot = document.querySelector('#main-container')!; // TODO
  const portalElement = document.createElement('div');

  const handleConfirm = () => {
    onTrue();
    portalRoot.removeChild(portalElement);
  };

  const handleCancel = () => {
    onFalse();
    portalRoot.removeChild(portalElement);
  };

  // TODO: portal?
  ReactDOM.render(
    <Confirm message={getConfirmableQuestions(question, args)} onConfirm={handleConfirm} onCancel={handleCancel} />,
    portalRoot.appendChild(portalElement),
  );
};
