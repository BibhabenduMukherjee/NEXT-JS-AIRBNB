import { format } from 'date-fns';
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import Footer from '../components/Footer'
import Header  from '../components/Header'
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';
 function Search({ searchResults}) {
  
    const router = useRouter();
    const {location , startDate , endDate , noOfGuests} = router.query;
   
    const formattedStartDate = format(new Date(startDate),"dd MMM yy" )
    const formattedEndDate = format(new Date(endDate) ,"dd MMM yy" )

  const range = `${formattedStartDate} - ${formattedEndDate}`


    return (
        <div className=''>
          <Header placeholder = {range}/>
          <main className='flex'> 
       <section className = 'flex-grow pt-14 px-6'>
           <p>300+ stays  for {noOfGuests} number of guests </p>
           <h1 className='text-3xl font-semibold mt-2 mb-6'>
            Stay in {location} with your dream!
           </h1>
   
        <div className='hidden lg:inline-flex mb-2 font-semibold space-x-3 whitespace-nowrap text-gray-800  '>
            <p className='button'>
                Cancellation Flexibility
            </p>

            <p className='button'>
               Types of place
            </p>
            <p className='button'>
               Price
            </p>
            <p className='button'>
               Beds and Rooms
            </p>
            <p className='button'>
               More Filters
            </p>

        </div>
         
      <div className='flex flex-col'>
        {searchResults?.map(({img , location , title ,description, star , price , total})=>(
           <InfoCard 
           key = {img}
           img={img}  
           location={location}  
           title={title}
            description={description}
            star={star}  
            price = {price}
            total = {total}
           />
        ))}
        </div>

       </section>


    <section className='hidden xl:inline-flex xl:min-w-[600px]'>
       <Map searchResults={searchResults}/>
    </section>
          
       

          </main>
          <p className='text-semibold text-gray-500 text-center p-2 '>
          Look on to your search 300+ stays
        </p>
         <Footer/>
        </div>
    )
}

export default Search

export async function getServerSideProps(){
   const searchResults  = await fetch("https://links.papareact.com/isz").
   then((res)=>res.json());
   return {
      props:{
         searchResults,
      }
   }
}