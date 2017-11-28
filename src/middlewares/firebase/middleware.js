import actionHandler from './actionHandler';
import Auth from './Auth';

export default function firebaseMiddleware(firebaseApp) {
  const handleAction = actionHandler(firebaseApp, [
    new Auth()
  ]);

  return store => next => action => handleAction(action, next);
}
