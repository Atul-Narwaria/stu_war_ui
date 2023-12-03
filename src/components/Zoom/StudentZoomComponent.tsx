import React, { useEffect, useState } from 'react';
import "./Zoom.css";

import { useParams } from 'react-router-dom';
import { decryptUUID } from '../../helper/encryptionKey';
import Cookies from 'js-cookie';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';



function StudentZoomComponent() {
const client = ZoomMtgEmbedded.createClient();
// const meetingSDKElement:any= document.getElementById('meetingSDKElement');
  
    let params:any = useParams();
    var authEndpoint = 'http://127.0.0.1:7000/api/institute/zoom/signature'
    var sdkKey = "MjrUGJm9R72Wtqq1npLgZA"
    var meetingNumber:any =  decryptUUID(params.meeting);
    var passWord:any = decryptUUID(params.password);
    var role = 0
    var userName = 'Atul'
    var leaveUrl = 'http://localhost:9090/student'
    useEffect(() => {
  getSignature();
      }, []);

      const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      useEffect(() => {
        const handleResize = () => {
          setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        };
    
        // Attach the event listener
        window.addEventListener('resize', handleResize);
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, );

  function getSignature() {
  
    let token:any = Cookies.get("token");
    fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        "Authorization":token
    },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      
      console.error(error)
    })
  }
  function startMeeting(signature:any) {
      console.log(screenSize)
    let meetingSDKElement = document.getElementById('meetingSDKElement');

    client.init({zoomAppRoot: meetingSDKElement!, language: 'en-US',
    customize: {
      video: {
        isResizable: true,
        viewSizes: {
          default: {
            width: 300,
            height: 800
          },
          ribbon: {
            width: screenSize.width,
            height: screenSize.height
          }
        }
      }
    }
  }).then(() => {
      client.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        password: passWord,
        userName: userName,
        userEmail: "atl@demo.in",
        tk: "",
        zak: ""
      }).then(() => {
        console.log('joined succesfully')
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
     <div className=' m-w-[100vw] m-h-[100vh] overflow-hidden!' id="meetingSDKElement"></div>
  );
}

export default StudentZoomComponent;
