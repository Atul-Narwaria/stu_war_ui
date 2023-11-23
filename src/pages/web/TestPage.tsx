import React, { useState } from 'react'
import ZoomMtgEmbedded from '@zoomus/websdk/embedded'
import { ZoomMtg } from '@zoomus/websdk';
ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.1/lib', '/av');
export default function TestPage() {

    const client = ZoomMtgEmbedded.createClient()

    const meetingSDKElement:any = document.getElementById('meetingSDKElement')
    
    client.init({ zoomAppRoot: meetingSDKElement})
    client.join({
        sdkKey: "JAvgSlYiTXiDMa4GUGRrSA",
        signature:'' ,// role in SDK signature needs to be 1
        meetingNumber:'4351309010',
        password: '9YYLkF',
        userName: 'Atu',
      })

  return (
    <div id="meetingSDKElement">
    
  </div>
  );
}




