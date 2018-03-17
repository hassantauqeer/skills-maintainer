import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { JOIN_LINKEDIN } from "./constants";
import axios from "axios";
import { linkedInConnData } from './selectors';
import $ from "jquery";

export function* joinLinkedIn () {
  const linkedInData = yield select(linkedInConnData());
  // console.log(linkedInData, "sagas");
  // const requestURL = "https://www.linkedin.com/uas/oauth2/accessToken/?grant_type=authorization_code&code=AQQGN12aeGbHlVSKiYFPdH8fRmmEJ4V8ihI_K1aEReGm0MRKlvJUTl8cunQy6TTv5PfRo6sgg-hdHFcpK4-hIpyMaYL453usZHkFR41qEtiLmbstEqVWT6YYXiTqizGcSqyjjALhyCVVi69dBVJrOT-8ERfP5g&redirect_uri=http://localhost:3000&client_id=860t6xr8dnzugs&client_secret=rj8LTaY3hx3CywYj";
  const noParamsRequestURL = "https://www.linkedin.com/uas/oauth2/accessToken/";
  // const requestURL = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=860t6xr8dnzugs&redirect_uri=http%3A%2F%2Flocalhost:3000%2Fauth%2Flinkedin&state=DCEeFWf45A53sdfKef424&scope=r_basicprofile";

  // const res = yield call(request, requestURL);

  var params = {
    grant_type: "authorization_code",
    code: linkedInData.code,
    redirect_uri: 'http://localhost:3000',
    client_id: "860t6xr8dnzugs",
    client_secret: "rj8LTaY3hx3CywYj"
  }
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://www.linkedin.com/uas/oauth2/accessToken/",
    "method": "POST",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Credentials": "true"
    },
    "data": params,
    // "data": {
    //   "grant_type": "\"authorization_code\"",
    //   "code": "\"AQSsNBtlNTpno-ujug_EoFPoBng_y1Y3CZ9mMS0tFLtgDdzN6qULjs9AZA6nxDmYecsZ8xhGP1xhLE_2X2DXuiRcidDSQHaz1w6goH_c1bwh4l4rX21Lxe02i3pO640ftIrh8LTG9i5LDxpP2-r9z8UQKKKanw\"",
    //   "redirect_uri": "\"http://localhost:3000\"",
    //   "client_id": "\"860t6xr8dnzugs\"",
    //   "client_secret": "\"rj8LTaY3hx3CywYj\""
    // },
  }
  console.log(linkedInData)
  console.log(params)
  console.log(settings)
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

  // try {
  //   const res = yield call(axios.post.bind(axios, "https://www.linkedin.com/uas/oauth2/accessToken/"), JSON.stringify(params),{
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   });
  //   console.log(res)
  //   // yield put(saveNewToken("New Got Token"));
  // } catch (err) {
  // }

  // response.header("Access-Control-Allow-Origin", request.headers.origin);
  // response.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  // response.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
  // response.header("Access-Control-Allow-Credentials", "true");
  // const res = yield call(axios.post.bind(axios, requestURL), {
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // })

  // console.log(res)
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(JOIN_LINKEDIN, joinLinkedIn)
  // See example in containers/HomePage/saga.js
}
