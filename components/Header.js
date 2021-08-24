import {useState} from 'react';
import Image from 'next/image';
import PublicIcon from '@material-ui/icons';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range';
import { SearchIcon , GlobeAltIcon , MenuIcon , UsersIcon}from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
function Header({placeholder}) {

    const [SearchInput , setSearchInput] = useState('');
    const [startDate , setStartDate] = useState(new Date())
    const [endDate , setEndDate]  = useState(new Date())
    const  [noOfGuests , setNoOfGuests] = useState(0);
    const router = useRouter();
    const handleSelect = (ranges)=>{
setStartDate(ranges.selection.startDate)
setEndDate(ranges.selection.endDate)
}

  // reset the input field when user click the cancle button  

const resetInput = ()=>{
    setSearchInput('')
}

const search = ()=>{
  router.push({
    pathname: "/search",
    query:{
      location: SearchInput,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      noOfGuests : noOfGuests,
    }

  })
}

    const selectionRange = {
        startDate: startDate,
        endDate:endDate,
        key:'selection'
    }

  

    return (




        <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10'>
          
   
        {/* create leftmost section  */}

        <div 
       onClick={()=> router.push('/')} className='relative flex items-center h-10 cursor-pointer my-auto animate-bounce' >
       <Image  src='https://links.papareact.com/qd3' layout='fill' 
       objectFit = 'contain' objectPosition='left'
       />

        </div>
   
        {/*  create the middle div  */}
        <div className='flex items-center md:border-2 
        rounded-full py-2 md:shadow-sm'>


             <input value={SearchInput} onChange={(e)=>setSearchInput(e.target.value)}
             type='text'  className='flex-grow pl-5 bg-transparent 
             outline-none text-sm text-gray-600'
              placeholder= { placeholder || 'Start your search'} 
             />

           <SearchIcon className=' hidden md:inline-flex h-8 bg-red-400
            text-white rounded-full p-2 cursor-pointer md:mx-2'  />

        </div>

        {/* create thr right-most div */}
    
         <div className='flex items-center space-x-4 justify-end  text-gray-500'>


                <p className='hidden md:inline'>Become a host</p>
                  <GlobeAltIcon  className='h-6 cursor-pointer'/>

              <div className='flex items-center space-x-2 border-2 p-2 rounded-full '>

                  <MenuIcon className='h-6'/>
                  <UsersIcon className='h-6'/>

              </div>

         </div>


       {/* create the calender functaionality */}
        {/* for that we use react-day library */}



    {SearchInput && (
        <div className='flex flex-col col-span-3 mx-auto'>
          <DateRangePicker
          ranges={[selectionRange]}
          minDate={new Date()}
          rangeColors = {['#FD5B61']}
          onChange = {handleSelect}
          />
        <div className='flex items-center border-b mb-2'>
            <h3 className='text-2xl text-gray-700 flex-grow font-semibold'>
                Number Of Guests
            </h3>
    
          <UsersIcon
          className= 'h-5  '
          />
          <input type='number' value={noOfGuests} className='w-11 pl-2 space-x-2 outline-none text-red-400'
          onChange= {(e)=>setNoOfGuests(e.target.value)}
          min = {1}
          />

        </div>
    
          {/* last div on header for cancle and search */}
        
        <div className =' flex'>
            <button className='flex-grow text-gray-500 p-2 
            hover:border-2' onClick={resetInput}>
            Cancel
            </button>
            <button onClick={search} 
            className='flex-grow text-red-400 pt-2 
            hover:border-2 p-2' >
            Serach
            </button>
        </div>

        </div>
    )}


   </header>
    )
}

export default Header;
