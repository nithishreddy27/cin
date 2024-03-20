import Html5QrcodePlugin from '@/src/Html5QrcodePlugin'
import Navbar from '@/src/Navbar';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
// import Html5QrcodePlugin from '@/src/components/Html5QrcodePlugin';
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
export default function Recharge() {

  
    const [userId, setuserId] = useState()
    const [user, setUser] = useState()
    const [amount, setAmount] = useState()

    const [scannerUser, setScannerUser] = useState()

    const { data: session, status } = useSession()
    const router = useRouter()
    console.log("status ",status , session);
    const [loginUser, setLoginUser] = useState()

    useEffect(()=>{
      if(status == "authenticated" && session){
        getOrganizer(session)
      }
      if(status == "unauthenticated"){
        router.push("/auth/login")
      }

    },[session])

    useEffect(()=>{
      if(user){
        if(user?.userType != "register"){
            signOut()
        }
      }
    },[user])


    async function getOrganizer(session){
      const userResponse = await axios.get(`../../api/user?email=${session?.user?.email}`)
      // console.log("user ",userResponse?.data.user);
      setLoginUser(userResponse?.data.user)
    }

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
        if(userResponse.data.person){
          setScannerUser(userResponse.data.person)

        }
        if(userResponse.data.error){
          StatusAlertService.showError("Recharge Successful");

        }
        // console.log("user Res ",userResponse);
    }

    const rechargeUser = async () =>{
        const rechargeResponse =  await axios.post("/api/recharge",{
            userId : scannerUser.userId,
            amount : amount
        })
        if(rechargeResponse.status == 200){
            StatusAlertService.showSuccess("Recharge Successful");
        }
    }
    
    useEffect(()=>{
      if(userId){
        getUser()
      }
    },[userId])
    
  return (
    <div>
      <StatusAlert />
      <Navbar/>
        
      <h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Recharge</h3>


    {!scannerUser && (
        <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
    />
    )}

    {scannerUser && (
        <div>
<div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto" data-v0-t="card">
  
  <div class="flex flex-col space-y-1.5 p-6">
    <h3 class="font-semibold whitespace-nowrap tracking-tight text-xl">
      {/* User <span class="font-medium">ACME123</span> */}
    </h3>
    <p class="text-sm text-muted-foreground">Customer information</p>

    {/* {imageUrl && <img src={imageUrl} alt="QR Code" className="mx-auto h-[250px]" />} */}

  </div>
  <div class="p-6 grid gap-4">
    <div class="flex items-center gap-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">Amount</div>
      <div class="font-semibold">{scannerUser.amount}</div>
    </div>
    <div class="flex items-center gap-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">Type</div>
      <div class="font-semibold">{scannerUser.userType}</div>
    </div>
    <div class="flex items-center gap-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">Phone</div>
      <div class="font-semibold">{scannerUser.phoneNumber}</div>
    </div>
    <div class="flex items-center gap-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">ID</div>
      <div class="font-semibold">{scannerUser.userId}</div>
    </div>
    <div>
      <div class="text-sm text-gray-500 dark:text-gray-400">Enter Amount</div>

    <input type="text" name="amount" id="amount" className='border border-black my-2' value={amount} onChange={(e)=>{setAmount(e.target.value)}} />
    <div>

                <button onClick={rechargeUser}>Submit</button>
    </div>
    </div>
    {/* <div class="flex items-center gap-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">Email</div>
      <div class="font-semibold"></div>
    </div> */}
  </div>
 
</div> 
       
        </div>
    )}
    </div>
  )
}
