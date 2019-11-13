import React from 'react';
import { Nav, NavItem, NavLink as NavLinkTab } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom'

const Tabs = (props) => {
  const movieId = props.match.params.id

  return (
      <Nav tabs>
        <NavItem>
          <NavLinkTab
            tag={NavLink}
            to={`/movie/${movieId}/details`}
          >
            Детали
          </NavLinkTab>
        </NavItem>
        <NavItem>
          <NavLinkTab
            tag={NavLink}
            to={`/movie/${movieId}/videos`}
          >
            Видео
          </NavLinkTab>
        </NavItem>
        <NavItem>
            <NavLinkTab
              tag={NavLink}
              to={`/movie/${movieId}/credits`}
            >
              Актеры
            </NavLinkTab>
        </NavItem>
      </Nav>
  );
}

export default withRouter(Tabs);