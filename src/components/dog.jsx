import { gql, useQuery } from '@apollo/client';

import {GET_DOG_QUERY} from '../queries';

export function Dog({ name })
{
  const { loading, error, data } = useQuery(GET_DOG_QUERY, {
    variables: { name }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <p>{data.dog.name} is a {data.dog.breed}</p>
  )
}
