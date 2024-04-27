import React, {useCallback, useEffect, useState} from 'react'
import { getTeamByName } from '@/utils/teamAPI';
/*
  This hook is used to fetch a team by name.
  Primarily designed to be used for autocomplete fields.
  @requires {Object} - an state object containing the input value, results, selected key, and selected value
  @returns {Object} - The team object
 */
export default function useTeamByName(
  input,
  setTeamField
) {

  const [isLoading, setIsLoading] = useState(false);

  const fetchTeam = useCallback( async () => {
    try {
      setIsLoading(true);
      const response = await getTeamByName(input)
        .then(res => {
          return res.docs.map( doc => {
            return {
              id: doc.id,
              ...doc.data()
            }
          })
        })
        .catch( error => {
          console.log("Error fetching team")
          throw error;
        })
      setTeamField( prev => {
        return {
          ...prev,
          results: response
        }
      })
    }catch {
      console.error(error);
    }finally {
      setIsLoading(false);
    }
  },[input, setTeamField])

  useEffect(() => {
    if (input?.length >= 5){
      fetchTeam()
    }
  }, [fetchTeam, input?.length])
  
  return {
    isLoading,
  }
}
