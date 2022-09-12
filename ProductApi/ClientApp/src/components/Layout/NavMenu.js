import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserLogin } from '../Pages/UserLogin';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
          <Container>
            <NavbarBrand tag={Link} to="/">Product App</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="Nav-link" to="/">Products</NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink tag={Link} className="Nav-link" exact to="/about">About Page</NavLink>
                </NavItem> */}
                <NavItem>
                  <NavLink tag={Link} className="Nav-link" to="/graph-data">Graph Data</NavLink>
                </NavItem>
                <UserLogin {...this.props} />
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
