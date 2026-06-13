import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MakesList from './MakesList'
import type { useMakeModelCatalog } from '../hooks/useMakeModelCatalog'

type MakesPanelProps = {
  catalog: ReturnType<typeof useMakeModelCatalog>
}

function MakesPanel({ catalog }: MakesPanelProps) {
  const hasMakes = catalog.makes.length > 0

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Makes</CardTitle>
      </CardHeader>

      <CardContent className="p-3">
        {catalog.makesQuery.isLoading ? (
          <LoadingState label="Loading makes" />
        ) : null}

        {!catalog.makesQuery.isLoading && catalog.makesErrorMessage ? (
          <EmptyState
            title="Could not load makes"
            description={catalog.makesErrorMessage}
          />
        ) : null}

        {!catalog.makesQuery.isLoading &&
        !catalog.makesErrorMessage &&
        !hasMakes ? (
          <EmptyState
            title="No makes found"
            description="Add BMW, Audi, Mercedes-Benz, Volkswagen, Toyota, and the other brands you sell."
          />
        ) : null}

        {!catalog.makesQuery.isLoading && hasMakes ? (
          <MakesList
            makes={catalog.makes}
            selectedMakeId={catalog.selectedMakeId}
            modelCounts={Object.fromEntries(
              catalog.makes.map((make) => [
                make.id,
                make.id === catalog.selectedMakeId
                  ? catalog.models.length
                  : make.models_count ?? 0,
              ])
            )}
            onSelectMake={catalog.selectMake}
          />
        ) : null}
      </CardContent>
    </Card>
  )
}

export default MakesPanel