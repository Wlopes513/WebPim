import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTachometer,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, toggle }: any) => (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
        <div className="sidebar-header">
            <span color="info" onClick={toggle} style={{ color: "#fff" }}>
                &times;
            </span>
            <h3>Logo Empresa</h3>
        </div>
        <div className="side-menu">
            <Nav vertical className="list-unstyled pb-3">
                <NavItem>
                    <NavLink tag={Link} to={"/"}>
                        <FontAwesomeIcon icon={faTachometer} className="mr-2" />
                        Dashboard
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={"/funcionarios"}>
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        Funcionários
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    </div>
);

export default SideBar;
