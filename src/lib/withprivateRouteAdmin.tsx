import { NextPageContext } from 'next';
import React, { Component } from 'react';
import { AuthToken } from '../services/authToken';
import { localCookieLoadToken } from './Cookies/token';

export type AuthProps = {
  token: string;
};

export function privateRouteAdmin(WrappedComponent: any) {
  return class Wkwkw extends Component<AuthProps> {
    state = {
      auth: new AuthToken(this.props.token),
    };

    static async getInitialProps(ctx: NextPageContext) {
      // create AuthToken
      const token = localCookieLoadToken(); // ServerCookie(ctx)[SEMNASUNKRISWINASUMBA_TOKEN_AUTH_LOCAL];
      const auth: any = new AuthToken(token);
      const initialProps = { auth };
      // if the token is expired, that means the user is no longer (or never was) authenticated
      // and if we allow the request to continue, they will reach a page they should not be at.
      if (!token) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      if (auth && auth.decodedToken.userType !== 'admin') {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }

      if (auth.isExpired) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      if (WrappedComponent.getInitialProps) {
        const wrappedProps = await WrappedComponent.getInitialProps(
          initialProps
        );
        // make sure our `auth: AuthToken` is always returned
        return { ...wrappedProps, auth };
      }
      return initialProps;
    }

    componentDidMount(): void {
      // since getInitialProps returns our props after they've JSON.stringify
      // we need to reinitialize it as an AuthToken to have the full class
      // with all instance methods available
      const token = localCookieLoadToken();
      const auth: any = new AuthToken(token);
      // console.log('token', token);
      // console.log('auth', auth);

      if (auth.decodedToken.userType !== 'admin') {
        window.location.href = '/login';
      }
      if (!token) {
        window.location.href = '/login';
      }

      if (auth.isExpired) {
        window.location.href = '/login';
      }

      this.setState({
        auth: auth,
      });
    }

    render() {
      // we want to hydrate the WrappedComponent with a full instance method of
      // AuthToken, the existing props.auth is a flattened auth, we want to use
      // the state instance of auth that has been rehydrated in browser after mount
      // const { auth, ...propsWithoutAuth } = this.props;
      const { ...propsWithoutAuth } = this.props;
      // return <></>;
      return <WrappedComponent auth={this.state} {...propsWithoutAuth} />;
    }
  };
}

// https://github.com/alan2207/nextjs-jwt-authentication
