import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { JOIN_LINKEDIN } from "./constants";
import axios from "axios";
import { linkedInConnData } from './selectors';
import $ from "jquery";
import request from "utils/request";

export function* joinLinkedIn () {
  const linkedInData = yield select(linkedInConnData());
  // console.log(linkedInData, "sagas");
  // const noParamsRequestURL = "https://www.linkedin.com/uas/oauth2/accessToken/";
  // const requestURL = "https://www.linkedin.com/uas/oauth/v2/authorization?grant_type=authorization_code&client_id=860t6xr8dnzugs&redirect_uri=http%3A%2F%2Flocalhost:3000&state=DCEeFWf45A53sdfKef424";
  // const requestURL = "https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code=AQQGN12aeGbHlVSKiYFPdH8fRmmEJ4V8ihI_K1aEReGm0MRKlvJUTl8cunQy6TTv5PfRo6sgg-hdHFcpK4-hIpyMaYL453usZHkFR41qEtiLmbstEqVWT6YYXiTqizGcSqyjjALhyCVVi69dBVJrOT-8ERfP5g&redirect_uri=http://localhost:3000&client_id=860t6xr8dnzugs&client_secret=rj8LTaY3hx3CywYj";
  const requestURL = "https://www.linkedin.com/uas/oauth2/v2/accessToken?grant_type=authorization_code&code="+ linkedInData.code + "&redirect_uri=http://localhost:3000&client_id=860t6xr8dnzugs&client_secret=rj8LTaY3hx3CywYj";
  // //

  // var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
  // var URL = "https://www.linkedin.com/cws/share?mini=true&amp;url=" + location.href;
  // var win = window.open(requestURL, "_blank", strWindowFeatures);


  console.log(requestURL)
  // axios.get(requestURL, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  //   .then(function(response){
  //     console.log(response.data); // ex.: { user: 'Your User'}
  //     console.log(response.status); // ex.: 200
  //   });


  // const res = yield call(request, requestURL);
  // console.log(res)
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
    "url": "https://www.linkedin.com/uas/oauth2/v2/accessToken/",
    "method": "POST",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Credentials": "true",
      "mode": "no-cors"
    },
    "data": {
      "grant_type": "\"authorization_code\"",
      "code": `\"${linkedInData.code}\"`,
      "redirect_uri": "\"http://localhost:3000\"",
      "client_id": "\"860t6xr8dnzugs\"",
      "client_secret": "\"rj8LTaY3hx3CywYj\""
    },
  }
  console.log(linkedInData)
  console.log(params)
  console.log(settings)
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

  // $.ajax({
  //   url: "https://www.linkedin.com/uas/oauth2/accessToken/",
  //   type: 'post',
  //   data: params,
  //   headers: {Authorization: "Basic " + btoa("860t6xr8dnzugs" + ":" + "rj8LTaY3hx3CywYj")},
  //   success: function(data) {
  //     console.log("Access token through Postman");
  //     console.log(data);
  //     var params = data;
  //     if(typeof data === "string") {
  //       params = getUrlVars("?"+data);
  //     }
  //     // pm.mediator.trigger("addOAuth2Token", params);
  //   }
  // });

  // var settings2 = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "https://api.linkedin.com/v1/people/~?format=json",
  //   "method": "GET",
  //   "headers": {
  //     "Authorization": "Bearer AQX6KCfVenT1k8JXL4EsdJlOsFVkCEbOC4i6V6QucdtaaKnmN8ezJAoHaTP56D8zFye1lgwXaO8UEFDeDnORpayiGVSpg4x-euTuzFNC5WBr4DW6YYOsdjgywUWaFMTVZ7Scv0CLOt-iKR8IJ237i_icBw22eNFDUQCOaW--vft1A2lsBkyuOWL039_N9AUzv5VIPtZtiGg5hJk9xkki_HCQo05jCnx54HdUdXJuhN-FkKY2HfeLPgAl9HaOSmMrHhSkTAK73uMTZfkeT5mG_iAj-1QxhGxiWRR3csmVu2kOm6wMw9VknEbWo5h_mPF5hO91SacGQIuJZWA9OmJJhPJHD6Hmsg",
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     "Cache-Control": "no-cache",
  //     "Postman-Token": "8df9801e-85cb-44a3-858f-bc1005cac73e"
  //   },
  //   "data": {
  //     "grant_type": "\"authorization_code\"",
  //     "code": `\"${linkedInData.code}\"`,
  //     "redirect_uri": "\"http://localhost:3000\"",
  //     "client_id": "\"860t6xr8dnzugs\"",
  //     "client_secret": "\"rj8LTaY3hx3CywYj\""
  //   }
  // }
  //
  // $.ajax(settings2).done(function (response) {
  //   console.log(response);
  // });

  // var settings3 = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "http://path_to_your_api/",
  //   "method": "GET",
  //   "headers": {
  //     "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlEwWkdOVUV3TlVVeE1UZzNSRVkyUmtSRFFqRXdNelJCTXpSRVFURkVRVEF4UkRRME1rTXhRUSJ9.eyJpc3MiOiJodHRwczovL3NraWxsLW1haW50YWluZXIuYXV0aDAuY29tLyIsInN1YiI6Ijh2UjMzMjNSZHNLaVpQUlZKMTUwejFLVFkwSWVkMFVwQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3NraWxsLW1haW50YWluZXIuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE1MjEzOTgxNTksImV4cCI6MTUyMTQ4NDU1OSwiYXpwIjoiOHZSMzMyM1Jkc0tpWlBSVkoxNTB6MUtUWTBJZWQwVXAiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.h22Lqbiqqphg9frwnrrUGrxEgeuUZL2bjt3WmlB1sIsh5hAVCJFVP_lH5HkGz3tXff74p5lvCnAf951Vw8_yunR11tN-vjCvdLF57i5VWTgqq4SBF6NSabxDgPkLzhl3G8s07f1ZZFsazPBA_91OE2COWszzcYoFDiIlp80VTukS8pmRVIVDkPkqowQrUCvnRFLThbtxlcjX5AFfBLZZAUrcrO46BU6xlb9oJ87kTW98Pnnh1ZmRv_objagWAqWfGi4jPAta-LDFhZMt9cPr-L0ALzV4uHLHmsNJrK1t4xrBESyHmlbz84yWmzehb_fEGunZz-tw6NVsF2EF1wuY2w"
  //   }
  // }
  //
  // $.ajax(settings3).done(function (response) {
  //   console.log(response);
  // });


  // $.ajax({
  //   url: "https://www.linkedin.com/uas/oauth2/accessToken/",
  //   data: {code:linkedInData.code, client_id:"860t6xr8dnzugs", state: linkedInData.state, client_secret:"rj8LTaY3hx3CywYj", redirect_uri:"http://localhost:3000", grant_type:"authorization_code"},
  //   type: 'POST',
  //   success: function(data){
  //     var access_token;
  //     if((data instanceof Object)){
  //       access_token = data.access_token;
  //     } else {
  //       access_token = data.getParam("access_token");
  //     }
  //     console.log(access_token, data)
  //     // successCallback(access_token, data);
  //   },
  //   error: function(error){
  //     // errorCallback(error, error);
  //   }
  // });


  // try {
  //   const res = yield call(axios.post.bind(axios, "http://localhost:3000/api/authenticate"), {code: linkedInData.code, state: linkedInData.state});
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
