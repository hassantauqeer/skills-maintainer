/**
*
* CallBack
*
*/

import React from 'react';
// import styled from 'styled-components';
import queryString  from 'query-string';

class CallBack extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const data = queryString.parse(this.props.history.location.hash);
    console.log(data, this.props.history.location.hash)
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

CallBack.propTypes = {

};

export default CallBack;
