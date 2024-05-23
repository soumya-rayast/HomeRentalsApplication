import React, { useEffect ,useState} from 'react'
import { useParams} from 'react-router-dom'
import "../Styles/List.scss"
import Navbar from "../components/Navbar"
import { useSelector,useDispatch } from 'react-redux'
import ListingCard from '../components/ListingCard'
import { setListings } from '../Redux/State';
import Loader from '../components/Loader'
import Footer from "../components/Footer"
const SearchPage = () => {
    const [loading, setLoading] = useState(true);
    const  {search} = useParams();
    const listings = useSelector((state)=>state.listings);
    const dispatch = useDispatch();

    const getSearchListings = async () =>{
        try {
            const reponse = await fetch(`http://localhost:3001/properties/search/${search}`,{
                method: "GET",
            });
            const data = await Response.json();
            dispatch(setListings({listings:data}));
            setLoading(false);

        } catch (err) {
            console.log("Fetch Search List failed",err.message);
        }
    }
    useEffect(()=>{
        getSearchListings();
    },[search])
    return loading ? <Loader/>: (
        <div>
            <Navbar />
            <h1 className='title-list'>Your Wish List</h1>
            <div className="list">
                {listings?.map((
                    _id,
                    creator,
                    listingPhotoPaths,
                    city,
                    province,
                    country,
                    category,
                    type,
                    price,
                    booking = false
                ) => (<ListingCard
                    listingId={_id}
                    creator={creator} 
                    listingPhotoPaths={listingPhotoPaths}
                    city={city}
                    province={province}
                    country={country}
                    category={category}
                    type={type}
                    price={price}
                    booking={booking}
                />))}
            </div>
            <Footer/>
        </div>
    )
}

export default SearchPage
