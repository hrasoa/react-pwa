import Firebase from './Firebase';
import Auth from './Auth';

export default function firebaseMiddleware(firebaseApp) {
  const FirebaseApp = new Firebase(firebaseApp, [
    new Auth()
  ]);
  return store => next => action => FirebaseApp.handleAction(action, next);
}
