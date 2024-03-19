import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "qrcode";
// const otpGenerator = require('otp-generator')
// import {otpGenerator} from "otp-generator"
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Nav from "@/src/Nav";
import Header from "./Header";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const { data: session, status } = useSession()
    const router = useRouter()
    console.log("status ",status , session);
    const [user, setUser] = useState()

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
      console.log("user ",userResponse?.data.user);
      setUser(userResponse?.data.user)
    }
  const [userId, setUserId] = useState();
  const [amount, setAmount] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  // const date = new Date()
  const [personDetails, setPersonDetails] = useState();
  const generateQRCode = async (email) => {
    try {
      console.log("email ", email);
      const qrCodeUrl = await QRCode.toDataURL(email);
      setImageUrl(qrCodeUrl);
    } catch (error) {
      console.error("Error generating QR code: ", error);
    }
  };

  // const submitForm = async () =>{

  //   console.log("inside subimit");
  //   await axios.post("/api/data",{
  //     amount ,
  //     phone
  //   })
  // }

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  async function submitForm(e) {
    console.log("submit form ", amount, phoneNumber , user.registrationDesk);
    const response = await axios.post("api/data", {
      amount,
      phone: phoneNumber,
      registerDesk : user?.registrationDesk
    });
    // console.log("resposne ",response);
    if (response.status == 200) {
      StatusAlertService.showSuccess("Successful");
      generateQRCode(response.data.person.userId);
      setPersonDetails(response.data.person);
    } else {
      StatusAlertService.error("unsuccessful");
    }
  }
  return (
    <div className="min-h-screen">
      <StatusAlert />
      <Header/>

      <div>
        {/* <label htmlFor="userId">User ID</label>
          <input type="text" name="userId" id="userId"  value={userId} onChange={()=>{
            console.log("user id cant be changed");
          }}/>  */}
        {/* <div>
          <div>
            <label htmlFor="amount">Amount</label>

            <input
              type="text"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="phone">Phone Number</label>

            <input
              type="text"
              name="phone"
              id="phone"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>

          <button
            onClick={(e) => {
              submitForm(e);
            }}
            className="cursor-pointer"
          >
            submit{" "}
          </button>
        </div> */}

        {/* <div>
          {personDetails && (
            <div>
              <p> user ID : {personDetails.userId}</p>
              <p>amount : {personDetails.amount}</p>
              <p>user Type : {personDetails.userType}</p>
              <p>Phone Number :{personDetails.phoneNumber}</p>
            </div>
          )}

          {imageUrl && <img src={imageUrl} alt="QR Code" className="mx-auto" />}
        </div> */}
      </div>

        <div>

        {!personDetails && ( 
      <div class="rounded-lg border bg-card text-card-foreground mt-20 border-black shadow-sm w-[50%] mx-auto" data-v0-t="card">
  <div class="flex flex-col space-y-1.5 p-6">
    <h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Make a payment</h3>
    <p class="text-sm text-muted-foreground">Enter the amount and your phone number to complete the payment.</p>
  </div>
  <div class="p-6">
    <div class="space-y-4">
      <div class="space-y-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="amount"
        >
          Amount
        </label>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="amount"
          placeholder="Enter the amount"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <div class="space-y-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="phone"
        >
          Phone number
        </label>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="phone"
          placeholder="Enter your phone number"
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </div>
    </div>
  </div>
  <div class="flex items-center p-6">
    <button class="bg-black  text-white p-2 rounded-lg mx-auto" 
      onClick={(e) => {
        submitForm(e);
      }}>
      Submit
    </button>
  </div>
</div>
        )}

{personDetails && ( 
<div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto" data-v0-t="card">
  
  <div class="flex flex-col space-y-1.5 p-6">
    <h3 class="font-semibold whitespace-nowrap tracking-tight text-xl">
      {/* User <span class="font-medium">ACME123</span> */}
    </h3>
    <p class="text-sm text-muted-foreground">Customer information</p>

    {imageUrl && <img src={imageUrl} alt="QR Code" className="mx-auto h-[250px]" />}

  </div>
  <div class="p-6 grid gap-4">
    <div class="flex items-center gap-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">Amount</div>
      <div class="font-semibold">{personDetails.amount}</div>
    </div>
    <div class="flex items-center gap-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">Type</div>
      <div class="font-semibold">{personDetails.userType}</div>
    </div>
    <div class="flex items-center gap-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">Phone</div>
      <div class="font-semibold">{personDetails.phoneNumber}</div>
    </div>
    <div class="flex items-center gap-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">ID</div>
      <div class="font-semibold">{personDetails.userId}</div>
    </div>
    {/* <div class="flex items-center gap-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">Email</div>
      <div class="font-semibold"></div>
    </div> */}
  </div>
 
</div> )}
</div>

    </div>
  );
}
