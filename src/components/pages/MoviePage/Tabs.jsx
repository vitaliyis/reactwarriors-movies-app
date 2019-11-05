import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink as NavLinkTab, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import MovieDetail from './MovieDetail'
import MovieVideos from "./MovieVideos";
import MovieCredits from "./MovieCredits";
import { Route, NavLink, Switch} from 'react-router-dom'

const Tabs = (props) => {
  let mark = '1';
  if (window.location.pathname.indexOf('videos') > 0) {
    mark = '2';
  } else if (window.location.pathname.indexOf('credits') > 0) {
    mark = '3';
  }
  const [activeTab, setActiveTab] = useState(mark);

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      {/*{console.log('window.location => ', window.location.pathname)}*/}
      <Nav tabs>
        <NavItem>
          <NavLinkTab
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
            tag={NavLink}
            to={`/movie/${props.movieId}/details`}
          >
            Детали
          </NavLinkTab>
        </NavItem>
        <NavItem>
          <NavLinkTab
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
            tag={NavLink}
            to={`/movie/${props.movieId}/videos`}
          >
            Видео
          </NavLinkTab>
        </NavItem>
        <NavItem>
          {/*<NavLink to={`/movie/${props.movieId}/credits`}>*/}
            <NavLinkTab
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
              tag={NavLink}
              to={`/movie/${props.movieId}/credits`}
            >
              Актеры
            </NavLinkTab>
          {/*</NavLink>*/}

        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        {/*<Switch>*/}
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                {/*<MovieDetail/>*/}
                <Route path="/movie/:id/details" component={MovieDetail}/>
                <Route exact path="/movie/:id" component={MovieDetail}/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                {/*<MovieVideos/>*/}
                <Route path="/movie/:id/videos" component={MovieVideos}/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                {/*<MovieCredits/>*/}
                <Route path="/movie/:id/credits" component={MovieCredits}/>
              </Col>
            </Row>
          </TabPane>
        {/*</Switch>*/}

      </TabContent>
    </div>
  );
}

export default Tabs;