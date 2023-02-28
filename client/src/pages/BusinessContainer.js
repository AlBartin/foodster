import { useState } from 'react'
import api from '../api/posts.js'
import { useRecoilState } from 'recoil'
import { businessesState } from '../recoil/atoms'
import { useEffect } from 'react'
import BusinessCard from '../components/BusinessCard.js'
 


function BusinessContainer() {

    const [businesses, setBusinesses] = useRecoilState(businessesState)

    const [terms, setTerms] = useState('')

    const handleChange = (e) => setTerms({...terms, [e.target.name]: e.target.value})
    
    const getBusinesses = async (e) => {
        e.preventDefault()
        try{
            const response = await api.get('businesses',
            {params: {
                term: terms.term,
                radius: terms.radius,
                location: terms.location
            },})
            setBusinesses(response.data.businesses)
            console.log(response.data)
        }
        catch(error){
            console.log(error)
        }
        }

    useEffect(() => {
        getBusinesses();
    }, [])
    

    const renderedBusinesses = businesses.map((business) => <BusinessCard key={business.id} business={business} />)

  return (
    <div>
         <form onSubmit={getBusinesses}>
            <label>Category</label>
            <input
                type='text'
                name='term'
                value={terms.term}
                onChange={handleChange}
            />
            <label>Radius</label>
            <input
                type='text'
                name='radius'
                value={terms.radius}
                onChange={handleChange}
            />
            <label>Location</label>
            <input
                type='text'
                name='location'
                value={terms.location}
                onChange={handleChange}
            />
            <button>Search</button>
        </form>
        {renderedBusinesses}
    </div>

  )
}

export default BusinessContainer