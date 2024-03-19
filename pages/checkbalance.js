import Html5QrcodePlugin from '@/src/Html5QrcodePlugin';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Checkbalance() {
    const [scanUser, setScanUser] = useState()

    const [user, setUser] = useState()
    const [userId, setuserId] = useState()

    const onNewScanResult = (decodedText, decodedResult) => {
        // handle decoded results here
        console.log("decoded text ",decodedText , " ", decodedResult)
        // handleSenderEmailChange(senderEmails.length+1, decodedText)
        // alert(decodedResult ,decodedText)
        // const user = decodedText;
        setuserId(decodedText)
        html5QrCode.stop()
    };

    const getUser = async ( ) =>{
        const userResponse = await axios.get(`/api/getUser?userId=${userId}`)
        if(userResponse){

        }
        setUser(userResponse.data.person)
        setScanUser(user)
        // console.log("user Res ",userResponse);
    }

        useEffect(()=>{
        if(userId){
          getUser()
        }
      },[userId])
  return (
    <div>checkbalance

        
    {user && (
        <div>
            user amount  : {user.amount}
        </div>
    )}
{!scanUser && (
        <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
    />
    )}
    </div>
  )
}
