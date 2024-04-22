import React, {useCallback, useEffect, useMemo, useState} from 'react'
import { getLeaguesByLikeTitle } from '@/utils/leagueAPI'

export default function useFetchLeague(input, setLeagueField) {

  const [isLoading, setIsLoading] = useState(false)

  const fetchLeagues = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await getLeaguesByLikeTitle(input).then( res => {
        return res.docs.map( doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
      }).catch( error => {
        console.error(error)
        throw error
      })

      setLeagueField(prev => {
        return {
          ...prev,
          results: response
        }
      })
      
    }catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  },[input, setLeagueField])

  useEffect(() => {
    if (input.length >= 5 ){
      fetchLeagues()
    }
  }, [fetchLeagues, input.length])
  
  return {
    isLoading,
  }
}
