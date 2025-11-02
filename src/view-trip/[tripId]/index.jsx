import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import InfoSection from '../components/infoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PLacesToVisit';
import Footer from '../components/Footer';

function Viewtrip() {

    const {tripId}=useParams();
    const[trip, setTrip]=useState([])

    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])

    /*
      Used to get Trip Information from Firebase
    */

    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No Such Document");
            toast('No trip Found!')
        }
    }

  return (
    <div className='p-10 md:px-20 lg:px-44'>
        {/* Information Section */}
            <InfoSection trip={trip}/>
        {/* Recommeded Hotels */}
            <Hotels trip={trip}/>
        {/* Daily plan */}
            <PlacesToVisit trip={trip}/>
        {/* Footer */}
            <Footer trip={trip} />
    </div>
  )
}

export default Viewtrip