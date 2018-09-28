import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import { User } from "../models/user";

export const MOCK_USER = new User("Administrator","@dm1n","local");

MOCK_USER.username = "Administrator";
MOCK_USER.password = "@dm1n";
MOCK_USER.site = "local"

/**
 * The user service.
 */
@Injectable()
export class UserService {

  /**
   * True if authenticated
   * @type
   */
  private _authenticated = false;

  /**
   * Authenticate the user
   *
   * @param {string} username The user's name
   * @param {string} password The user's password
   * @returns {Observable<User>} The authenticated user observable.
   */
  public authenticate(username: string, password: string, site: string): Observable<User> {
    // Normally you would do an HTTP request to determine to
    // attempt authenticating the user using the supplied credentials.

    if (username === MOCK_USER.username && password === MOCK_USER.password) {
      this._authenticated = true;
      return Observable.of(MOCK_USER);
    }

    return Observable.throw(new Error("Invalid username or password"));
  }

  /**
   * Determines if the user is authenticated
   * @returns {Observable<boolean>}
   */
  public authenticated(): Observable<boolean> {
    return Observable.of(this._authenticated);
  }

  /**
   * Returns the authenticated user
   * @returns {User}
   */
  public authenticatedUser(): Observable<User> {
    // Normally you would do an HTTP request to determine if
    // the user has an existing auth session on the server
    // but, let's just return the mock user for this example.
    return Observable.of(MOCK_USER);
  }

  /**
   * Create a new user
   * @returns {User}
   */
  public create(user: User): Observable<User> {
    // Normally you would do an HTTP request to POST the user
    // details and then return the new user object
    // but, let's just return the new user for this example.
    this._authenticated = true;
    return Observable.of(user);
  }

  /**
   * End session
   * @returns {Observable<boolean>}
   */
  public signout(): Observable<boolean> {
    // Normally you would do an HTTP request sign end the session
    // but, let's just return an observable of true.
    this._authenticated = false;
    return Observable.of(true);
  }
}
