import {useState} from 'react';
import {useQuery} from '@apollo/client';

import {GET_FOLDER} from '../queries';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Error from "../components/Error/Error.component";


const Folder = ({match}) => {
  const [errors, setError] = useState([])
  const {_id} = match.params
  console.log(match)
  const {loading, error, data} = useQuery(GET_FOLDER, {
    variables: {
      _id,
    }
  });
  

  if(loading) return <LoadingSpinner />;
  if(error) return <Error errors={error}/>

  return (
    <div>
      {_id}
      {errors && <Error errors={errors} />}
    </div>
  );
}

export default Folder;
