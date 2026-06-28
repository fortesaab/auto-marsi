import { useQuery } from '@tanstack/react-query'
import { getPublicMakeModels } from '../api/getPublicMakeModels'
import { getPublicMakes } from '../api/getPublicMakes'

type UsePublicMakeOptionsParams = {
  makeId: string
}

export function usePublicMakeOptions({ makeId }: UsePublicMakeOptionsParams) {
  const makesQuery = useQuery({
    queryKey: ['public', 'makes'],
    queryFn: getPublicMakes,
    staleTime: 5 * 60_000,
  })

  const modelsQuery = useQuery({
    queryKey: ['public', 'makes', makeId, 'models'],
    queryFn: () => getPublicMakeModels(makeId),
    enabled: makeId !== '',
    staleTime: 5 * 60_000,
  })

  return {
    makes: makesQuery.data?.data ?? [],
    models: modelsQuery.data?.data ?? [],
    makesQuery,
    modelsQuery,
  }
}
