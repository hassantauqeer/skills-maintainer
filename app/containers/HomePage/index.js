/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { linkedInConnData } from './selectors';
import reducer from './reducer';
import saga from './saga';
import LinkedIn from 'react-linkedin-login'
import queryString  from 'query-string';
import { saveLinkedConnection, joinLinkedIn } from "./actions";
import { Card, Button, Row } from 'antd';
import Auth from '../Authorization/Auth.js';
// import Button from "antd/lib/button/button.d";
const auth = new Auth();

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount(){
    const connectionObj = queryString.parse(this.props.history.location.search);
    // console.log(connectionObj)
    if(connectionObj.code && connectionObj.state ) {
      // console.log(connectionObj, 'inside')
      this.props.saveLinkedConnection(connectionObj);
      this.props.joinLinkedIn();
    }

  }
  oAuthLogin = () => {
    auth.login();
  }
  render() {
    // console.log(this.props.linkedInConnData, 'linkedInConnData')
    return (
      <div className="home-container">
        <Card title="Join Us" bordered={false} style={{ width: 300 }}>
          <Row  style={{ width: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <a href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=860t6xr8dnzugs&redirect_uri=http://localhost:3000&state=987654321&scope=r_basicprofile"><img style={{}} src={require("../../images/icons/linkedin-256.png")}/></a>
            <Button style={{marginTop: 20}} onClick={this.oAuthLogin}>Login LinkedIn with auth0</Button>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  linkedInConnData: linkedInConnData(),
});

function mapDispatchToProps(dispatch) {
  return {
    joinLinkedIn: () => dispatch(joinLinkedIn()),
    saveLinkedConnection: (val) => dispatch(saveLinkedConnection(val))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
