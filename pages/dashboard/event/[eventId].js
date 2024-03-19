import axios from 'axios';
import { getSession, signOut, useSession } from 'next-auth/react'
// import React from 'react'

import Html5QrcodePlugin from '@/src/Html5QrcodePlugin'
// import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import Html5QrcodePlugin from '@/src/components/Html5QrcodePlugin';
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { useRouter } from 'next/router';
import Header from '@/pages/Header';

export default function EventId() {
    const { data: session, status } = useSession()
    const router = useRouter()
    console.log("status ",status , session);
    const [user, setUser] = useState()
    const { eventId } = router.query;

    useEffect(()=>{
      if(status == "authenticated" && session){
        getOrganizer(session)
      }
      if(status == "unauthenticated"){
        router.push("/auth/login")
      }

    },[session])



    async function getOrganizer(session){
      const userResponse = await axios.get(`../../api/user?email=${session?.user?.email}`)
      // console.log("user ",userResponse?.data.user);
      setUser(userResponse?.data.user)
    }

    useEffect(()=>{
      if(user){
        console.log("isndie user ", user.eventId , eventId);
        if(user.eventId != eventId ){
          console.log("inside this");
          router.push(`/dashboard/event/${user.eventId}`)
        }
      }
    },[user])
    
    // const user = JSON.parse(userDetails);
    // // console.log("user ",user);

    const [userId, setuserId] = useState()
    const [scanUser, setScanUser] = useState()
    const [recievedUser, setRecievedUser] = useState()
    const [amount, setAmount] = useState()
    const [numberOfTickets, setNumberOfTickets] = useState()
    // const router = useRouter()
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
        const userResponse = await axios.post(`/api/registerStudent`,{
            userId:userId ,
            amount : user.eventAmount,
            eventName : user.eventName,
            eventId : user.eventId,
            eventAmount : user.eventAmount,
            numberOfTickets : numberOfTickets,
            organiserEmail : user.email
        })
        if(userResponse.data.error){
          StatusAlertService.showError("Invalid User");
        }
        else{

          setScanUser(userResponse.data.person)
          console.log("user Res ",userResponse);
          if(userResponse.data.person){
            StatusAlertService.showSuccess(`Successful Registered to ${user.eventName}`);
            // router.reload()
            setuserId("")
            setRecievedUser(userResponse.data.person)
          }
          else{
            
            StatusAlertService.showError("Insuffient Funds");
          } 
        }
      }
    // useEffect(()=>{
    //     if(userId){
    //       getUser()
    //     }
    //   },[userId])


  return (
    <div>
      <StatusAlert />
      <Header/>

        {/* EventId */}
        <div>
            {/* {user && (
              <div>
              <h1>Email : {user.email}</h1>
              <h1>Event Name : {user.eventName}</h1>
              <h1>Event Id : {user.eventId}</h1>
              <h1>Event Amount : {user.eventAmount}</h1> 
          </div>
            )} */}
{user && (
  
<div class="rounded-lg border bg-card text-card-foreground mt-20 border-black shadow-sm w-[50%] mx-auto" data-v0-t="card">
  <div class="flex flex-col space-y-1.5 p-6">
    <h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Event Details</h3>
    {/* <p class="text-sm text-muted-foreground">Enter the amount and your phone number to complete the payment.</p> */}
  </div>
  <div class="p-6">
    <div class="space-y-4">
      <div class="space-y-2">
        <div className='flex'>

        <p
          class=" font-bold mx-4"
        
          >
          Email 
        </p>
        <p class="">{user.email} </p>
          </div>
        <div className='flex'>

        <p
          class=" font-bold mx-4"
        
          >
          Event Name
        </p>
        <p class="">{user.eventName} </p>
          </div>
        <div className='flex'>

        <p
          class=" font-bold mx-4"
        
          >
          Event Id
        </p>
        <p class="">{user.eventId} </p>
          </div>
        <div className='flex'>

        <p
          class=" font-bold mx-4"
        
          >
          Event Amount 
        </p>
        <p class="">{user.eventAmount} </p>
          </div>
        <div className='flex'>

        <p
          class=" font-bold mx-4"
        
          >
          User Id
        </p>
        <input type="text" name="userId" id="userId" className='border rounded-lg border-black' value={userId} 
        onChange={()=>{
                    console.log("Cant change");
                }} readOnly/>
          </div>
        <div className='flex'>

        <p
          class=" font-bold mx-4"
        
          >
          Number of Tickets
        </p>
        <input type="text" name="numberOfTickets" id="numberOfTickets" className='border rounded-lg border-black'  value={numberOfTickets}  onChange={(e)=>{
                    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                    setNumberOfTickets(value);
                  }}/>
          </div>
          
       
      </div>
  
    </div>
  </div>
  <div class="flex items-center p-6">
    <button class="bg-black  text-white p-2 rounded-lg mx-auto" 
      onClick={(e) => {
        getUser()
      }}>
      Submit
    </button>
  </div>
</div>
)}

            {/* <div>
                <input type="text" name="userId" id="userId" value={userId} onChange={()=>{
                    console.log("Cant change");
                }}/>
                <div>

                <input type="text" name="numberOfTickets" id="numberOfTickets" value={numberOfTickets} className='border border-black my-2' onChange={(e)=>{
                    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                    setNumberOfTickets(value);
                  }}/>
                  </div>
                 <button onClick={getUser}>Submit</button>
            </div> */}
        </div>

        <div>
          {recievedUser && (
            <div>
              <h1>Avaliable Balance  : {recievedUser.amount}</h1>
            </div>
          )}
        </div>

        {!userId && (
        <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
    />
    )}

    </div>
//     <div>
// Start

// <button onClick={()=>{signOut()}}>Signout</button>
//     </div>
  )
}


// export async function getServerSideProps(context){
//   const session  = await getSession(context)
//       if(!session){
//         return {
//           redirect: {
//             destination: '/auth/login',
//             permanent: false,
//           },
//         };
//       }
// }


// export async function getServerSideProps(context) {


//     const session = await getSession(context);
//     const query = context?.query?.eventId
//     console.log("session ",query);
    
//     if(!session){
//         return {
//           redirect: {
//             destination: '/auth/login',
//             permanent: false,
//           },
//         };
//       }
//     var user
//     if(session){
//       const userResponse = await axios.get(`${process.env.HOST_URL}/api/user?email=${session?.user?.email}`)
//       console.log("user ",userResponse?.data.user);
//       user  = userResponse?.data.user
//     if(user){ 
//       if(user.eventId != Number(query)){
       
//         return {
//           redirect: {
//             destination: `/dashboard/event/${user.eventId}`,
//             permanent: false,
//           },
//         };
//       }
//     }
//   }

//     return {
//       props: {
//         session: await getSession(context),

//         userDetails : JSON.stringify(user),

//       },
//     };
//   }