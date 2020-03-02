/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import {Nav,NavItem} from "react-bootstrap";

class HeaderLinks extends Component {
  render() {
    return (
      <div>
      <Nav pullRight>
        {/* <NavItem
          eventKey={3}
          href="/"
          onClick={() => {localStorage.clear()}}
        >
          <div className="text-danger" style={{ marginTop: 14 }}>
            <i className="pe-7s-close-circle" /> Log out
            </div>
        </NavItem> */}
      
      </Nav>
      
      </div>
    );
  }
}
export default HeaderLinks;
