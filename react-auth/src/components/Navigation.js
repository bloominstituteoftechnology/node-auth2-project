import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { NavLink, NavbarBrand, Navbar, Nav } from 'reactstrap';
import { Icon } from 'semantic-ui-react';

const Navigation = () => {
    const history = useHistory()
    const logout = e => {
        e.preventDefault()
        localStorage.clear()
        history.push('/api/auth/login')
      }
return(
  <div className="navigation">
    <Navbar>
      <NavbarBrand tag={Link} to="/" className="mr-auto">
       Users keeper
      </NavbarBrand>

      {localStorage.getItem('token') ? (
           <Nav className='nav-links'>
          <NavLink tag={Link} to="/api/users">Users</NavLink> 
          <NavLink tag={Link} to="/api/auth/login" >
            <Icon  onClick={logout} name="log out" size="big" alternate outline />
          </NavLink>
          </Nav>
      ) : (
        <Nav className='nav-links'>
        <NavLink tag={Link} to="/api/auth/register">Register</NavLink>
        <NavLink tag={Link} to="/api/auth/login">LogIn</NavLink>
        </Nav>
      )}
    </Navbar>
  </div>
)};
export default Navigation;
