import { useQuery } from '@tanstack/react-query'
import { fetchEventsByTag } from '../utils/supabase/database/fetch'

const useHomePageEvents = (category) => {
  const queryKey = ['home-page-events', category]
  const queryFn = async () => fetchEventsByTag(category)

  return useQuery({
    queryKey,
    queryFn
  })
}

export default useHomePageEvents
