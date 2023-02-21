// import { useState } from 'react'
// import api from '../api/posts'

// function BusinessSearchForm() {

//     const [terms, setTerms] = useState('')

//     const handleChange = (e) => setTerms({...terms, [e.target.name]: e.target.value})
    
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try{
//             const response = await api.get('businesses',
//             {params: {
//                 term: terms.term,
//                 radius: terms.radius,
//                 limit: 10,
//                 location: terms.location
//             },})
//         }
//         catch(error){
//             console.log(error)
//         }
//         }

//   return (
//     <div>
//         <form onSubmit={handleSubmit}>
//             <label>Category</label>
//             <input
//                 type='text'
//                 name='term'
//                 value={terms.term}
//                 onChange={handleChange}
//             />
//             <label>Radius</label>
//             <input
//                 type='text'
//                 name='radius'
//                 value={terms.radius}
//                 onChange={handleChange}
//             />
//             <label>Location</label>
//             <input
//                 type='text'
//                 name='location'
//                 value={terms.location}
//                 onChange={handleChange}
//             />
//             <button>Search</button>
//         </form>
//     </div>
//   )
// }

// export default BusinessSearchForm