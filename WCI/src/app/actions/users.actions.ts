// import @ngrx
import { Action } from "@ngrx/store";

// import models
import { User } from "../models/user";

export const ActionTypes = {
  AUTHENTICATE: '[users] Authenticate',
  AUTHENTICATE_ERROR: '[users] Authentication error',
  AUTHENTICATE_SUCCESS: '[users] Authentication success',
  AUTHENTICATED: '[users] Authenticated',
  AUTHENTICATED_ERROR: '[users] Authenticated error',
  AUTHENTICATED_SUCCESS: '[users] Authenticated success',
  SIGN_OUT: '[users] Sign off',
  SIGN_OUT_ERROR: '[users] Sign off error',
  SIGN_OUT_SUCCESS: '[users] Sign off success',
  SIGN_UP: '[users] Sign up',
  SIGN_UP_ERROR: '[users] Sign up error',
  SIGN_UP_SUCCESS: '[users] Sign up success',
  GO: '[users] Go'
};

/**
 * Authenticate.
 * @class AuthenticateAction
 * @implements {Action}
 */
export class AuthenticateAction implements Action {
  public type: string = ActionTypes.AUTHENTICATE;

  constructor(public payload: {username: string, password: string, site: string}) {}
}

/**
 * Checks if user is authenticated.
 * @class AuthenticatedAction
 * @implements {Action}
 */
export class AuthenticatedAction implements Action {
  public type: string = ActionTypes.AUTHENTICATED;

  constructor(public payload?: {token?: string}) {}
}

/**
 * Authenticated check success.
 * @class AuthenticatedSuccessAction
 * @implements {Action}
 */
export class AuthenticatedSuccessAction implements Action {
  public type: string = ActionTypes.AUTHENTICATED_SUCCESS;

  constructor(public payload: {authenticated: boolean, user: User}) {}
}

/**
 * Authenticated check error.
 * @class AuthenticatedErrorAction
 * @implements {Action}
 */
export class AuthenticatedErrorAction implements Action {
  public type: string = ActionTypes.AUTHENTICATED_ERROR;

  constructor(public payload?: any) {}
}

/**
 * Authentication error.
 * @class AuthenticationErrorAction
 * @implements {Action}
 */
export class AuthenticationErrorAction implements Action {
  public type: string = ActionTypes.AUTHENTICATE_ERROR;

  constructor(public payload?: any) {}
}

/**
 * Authentication success.
 * @class AuthenticationSuccessAction
 * @implements {Action}
 */
export class AuthenticationSuccessAction implements Action {
  public type: string = ActionTypes.AUTHENTICATE_SUCCESS;

  constructor(public payload: { user: User }) {}
}

/**
 * Sign out.
 * @class SignOutAction
 * @implements {Action}
 */
export class SignOutAction implements Action {
  public type: string = ActionTypes.SIGN_OUT;
  constructor(public payload?: any) {}
}

/**
 * Sign out error.
 * @class SignOutErrorAction
 * @implements {Action}
 */
export class SignOutErrorAction implements Action {
  public type: string = ActionTypes.SIGN_OUT_SUCCESS;
  constructor(public payload?: any) {}
}

/**
 * Sign out success.
 * @class SignOutSuccessAction
 * @implements {Action}
 */
export class SignOutSuccessAction implements Action {
  public type: string = ActionTypes.SIGN_OUT_SUCCESS;
  constructor(public payload?: any) {}
}

/**
 * Redirects on successful sign in
 * @class GoAction
 * @implements {Action}
 */
export class Go implements Action{
  public type: string = ActionTypes.GO;
  constructor(public payload?: any){}
}


/**
 * Actions type.
 * @type {Actions}
 */
export type Actions
  =
  AuthenticateAction
  | AuthenticatedAction
  | AuthenticatedErrorAction
  | AuthenticatedSuccessAction
  | AuthenticationErrorAction
  | AuthenticationSuccessAction
