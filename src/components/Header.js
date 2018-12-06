import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, deleteToken, decodeToken } from '../lib/auth';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    deleteToken();
    this.props.history.push('/');
  }

  render() {
    const { pathname } = this.props.location;
    const username = decodeToken().username;

    return (
      <nav className="navbar is-fixed-bottom is-dark">
        <div className="navbar-menu is-active">
          <div className="navbar-start">
            { pathname !== '/' && <Link className="navbar-item" to='/'>Home</Link>}
            <Link className="navbar-item" to='/bags'> Collection</Link>
            <Link className="navbar-item" to='/bags/new'> Add an item</Link>
            <Link className="navbar-item" to='/login'> Login</Link>
            <Link className="navbar-item" to='/register'> Register</Link>
            <Link className="navbar-item" to='/basket'> Shopping Cart</Link>
            {isAuthenticated() && <a className="navbar-item" onClick={this.handleLogout}>Logout { username }</a>}
            <Link className="navbar-item" to='/purchases'> Purchase history</Link>
            {/* {isAuthenticated() && <p className="navbar-item">Welcome back! {decodeToken().username}</p>} */}

          </div>
        </div>
      </nav>

    );
  }
}

export default withRouter(Header);
