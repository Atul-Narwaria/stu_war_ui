import React from 'react';
import "./Zoom.css";

import { useParams } from 'react-router-dom';
import { decryptUUID } from '../../helper/encryptionKey';
import Cookies from 'js-cookie';
import { ZoomMtg } from '@zoomus/websdk';
ZoomMtg.setZoomJSLib('https://source.zoom.us/2.17.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function StudentZoom() {
    let params:any = useParams();
  var authEndpoint = 'http://127.0.0.1:7000/api/institute/zoom/signature'
  var sdkKey = "MjrUGJm9R72Wtqq1npLgZA"
  var sdkSecret = "AT1NNLz50oiKEJRjUeKgm6o6GyFseDjj"
  var meetingNumber:any =  decryptUUID(params.meeting);
  var passWord:any = decryptUUID(params.password);
  var role:any = 0
  var userName = 'Atul'
  var leaveUrl = 'http://localhost:9090/student'

  // function getSignature() {
  //   let token:any = Cookies.get("token");
  //   fetch(authEndpoint, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json',
  //       "Authorization":token
  //   },
  //     body: JSON.stringify({
  //       meetingNumber: meetingNumber,
  //       role: role
  //     })
  //   }).then(res => res.json())
  //   .then(response => {
  //     startMeeting(response.signature)
  //   }).catch(error => {
  //     console.error(error)
  //   })
  // }
  ZoomMtg.generateSDKSignature({
    meetingNumber:meetingNumber,
    role: role,
    sdkKey: sdkKey,
    sdkSecret: sdkSecret,
    success: function (signature:any) {
      startMeeting(signature.result)
    },
    error: function (error:any) {
          console.log(error);
        },
})
  function startMeeting(signature:any) {
    const element:any = document.getElementById("zmmtg-root");
    if (element) {
        element.style.display = 'block';
    }
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      disableInvite: true,
      
      success: (success:any) => {
        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          success: (success:any) => {
          },
          error: (error:any) => {
            console.log(error.message)
          }
        })

      },error: (error:any) => {
        console.log(error.message)
      }
      
    })
  }
  // getSignature();
  return (
    <div className="App">
      loading....
    </div>
  );
}

export default StudentZoom;
