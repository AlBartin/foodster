import api from '../api/posts.js'
import { useEffect } from 'react'

function BusinessDetail({ togglePopUp, id}) {

	const getBusiness = async () => {
		try {
			const response = await api.get(`businesses/${id}`, {
				params: { id: id },
			});
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getBusiness();
	}, []);
  
	const handlePopUp = () => togglePopUp();

	return <div onClick={handlePopUp}>BusinessDetail</div>;
}

export default BusinessDetail;
