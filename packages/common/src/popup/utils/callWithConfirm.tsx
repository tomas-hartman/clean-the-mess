import { Confirm } from '../components/Confirm';
import { createRoot } from 'react-dom/client';

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
  const container = document.getElementById('modal-root');
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript

  const handleConfirm = () => {
    onTrue();
    root.unmount();
  };

  const handleCancel = () => {
    onFalse();
    root.unmount();
  };

  root.render(
    <Confirm message={getConfirmableQuestions(question, args)} onConfirm={handleConfirm} onCancel={handleCancel} />,
  );
};
