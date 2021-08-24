import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import next from 'next'
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard'
import LargeCard from '../components/LargeCard'
import Footer from '../components/Footer'
export default function Home({ exploreData, cardData }) {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* header
      banner
       */}

      <Header />
      <Banner />

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        {/* for the SmallCard -- start ---  */}

        <section className='pt-6'>
          <h2 className='text-4xl  font-semibold'>
            explore nearby
          </h2>

          {/* pul the data API CALL */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {exploreData?.map(({ img, location, distance }) => (
              <SmallCard
                key={img} img={img} distance={distance}
                location={location} />
            ))}
          </div>

        </section>

        {/* end of the SmallCard -- end --  */}

        {/* ------------------------------------------------------------- */}



        {/* start the mediumCard -- start --  */}
        <section>
          <h2 className='text-4xl font-semibold py-8'>
            Live Anywhere
          </h2>
          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3'> 
          {cardData?.map(({img, title}) => (
            <MediumCard key={img}
              img={img}
              title={title}
            />
          ))}
          </div>

        </section>

        {/* end the mediumCard -- end --  */}


   {/* _______________________________________________________ */}

        {/* large Card -- start --  */}



       <LargeCard 
        img ='https://links.papareact.com/4cj'
        title = 'The Greatest Outdoors'
        description='Wishlists curated by Airnub'
        buttonText ='Get Inspired'
       />


        {/* large Card -- end --  */}

      </main>
   

       {/* footer section */}

     <Footer/>

    </div>
  )
}







// load card data from server
export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').
    then(
      (res) =>
        res.json()
    );

  const cardData = await fetch('https://links.papareact.com/zp1').then(
    (res) =>
      res.json()
  );

  return {
    props: {
      exploreData,
      cardData,
    }
  }
}


// next.js create a server between the react app and the
// client and reduces the unnessesary reqest-rendering 
// so fastly deliver the pages
