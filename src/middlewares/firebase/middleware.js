import Firebase from './Firebase';
import Auth from './Auth';

export default function firebaseMiddleware(app) {
  const FirebaseApp = new Firebase(app, [
    new Auth()
  ]);
  return store => next => action => FirebaseApp.handleAction(action, next);
}
