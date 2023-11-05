import * as React from 'react';
import { Navbar, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';

export default class NavMenu extends React.PureComponent<any, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        const { toggle } = this.props as any;

        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <div className='d-flex'>
                        <ul className="navbar-nav flex-grow flex-row">
                            <NavItem>
                                <NavLink className="text-black" onClick={toggle}>
                                    <FontAwesomeIcon icon={faAlignLeft} />
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-black" to="/">Dashboard</NavLink>
                            </NavItem>
                        </ul>
                    </div>
                </Navbar>
            </header>
        );
    }
}
