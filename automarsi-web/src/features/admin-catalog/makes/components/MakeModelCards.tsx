import { MoreHorizontal, Plus } from 'lucide-react'
import AdminSurface from '@/components/admin/AdminSurface'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { useMakeModelCatalog } from '../hooks/useMakeModelCatalog'
import type { AdminMake, AdminModel } from '../types'
import CreateMakeForm from './CreateMakeForm'
import CreateModelForm from './CreateModelForm'
import EditMakeForm from './EditMakeForm'
import ModelsPanel from './ModelsPanel'

type MakeModelCardsProps = {
  catalog: ReturnType<typeof useMakeModelCatalog>
}

function makeInitials(make: AdminMake): string {
  const name = make.name.trim()

  if (name.length <= 3) {
    return name.toUpperCase()
  }

  return name
    .split(/\s|-+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function visibleModels(make: AdminMake, selectedModels: AdminModel[]) {
  if (make.models?.length) {
    return make.models.slice(0, 5)
  }

  return selectedModels.slice(0, 5)
}

function MakeModelCards({ catalog }: MakeModelCardsProps) {
  const isLoading = catalog.makesQuery.isLoading
  const hasMakes = catalog.makes.length > 0

  return (
    <div className="grid gap-4">
      {catalog.makesErrorMessage ? (
        <EmptyState
          title="Could not load makes"
          description={catalog.makesErrorMessage}
        />
      ) : null}

      {catalog.isCreateMakeOpen ? (
        <CreateMakeForm
          isSubmitting={catalog.createMakeMutation.isPending}
          errorMessage={
            catalog.createMakeMutation.error instanceof Error
              ? catalog.createMakeMutation.error.message
              : null
          }
          onSubmit={async (payload) => {
            await catalog.createMakeMutation.mutateAsync(payload)
          }}
        />
      ) : null}

      {catalog.editingMake ? (
        <EditMakeForm
          make={catalog.editingMake}
          isSubmitting={catalog.updateMakeMutation.isPending}
          errorMessage={
            catalog.updateMakeMutation.error instanceof Error
              ? catalog.updateMakeMutation.error.message
              : null
          }
          onCancel={() => catalog.setEditingMake(null)}
          onSubmit={async (payload) => {
            await catalog.updateMakeMutation.mutateAsync({
              makeId: catalog.editingMake!.id,
              ...payload,
            })
          }}
        />
      ) : null}

      {catalog.isCreateModelOpen && catalog.selectedMake ? (
        <CreateModelForm
          makeName={catalog.selectedMake.name}
          isSubmitting={catalog.createModelMutation.isPending}
          errorMessage={
            catalog.createModelMutation.error instanceof Error
              ? catalog.createModelMutation.error.message
              : null
          }
          onSubmit={async (payload) => {
            await catalog.createModelMutation.mutateAsync(payload)
          }}
        />
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? <LoadingState label="Loading makes" /> : null}

        {!isLoading && !catalog.makesErrorMessage && !hasMakes ? (
          <EmptyState
            title="No makes found"
            description="Add the first brand to start building your catalog."
          />
        ) : null}

        {!isLoading
          ? catalog.makes.map((make) => {
              const isSelected = make.id === catalog.selectedMakeId
              const models = visibleModels(
                make,
                isSelected ? catalog.models : []
              )

              return (
                <AdminSurface
                  key={make.id}
                  className={cn(
                    'transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)]',
                    isSelected && 'ring-2 ring-primary/15'
                  )}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    className="grid w-full cursor-pointer gap-4 p-4 text-left"
                    onClick={() => catalog.selectMake(make.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        catalog.selectMake(make.id)
                      }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-xl bg-amber-100 text-sm font-bold text-amber-700">
                          {makeInitials(make)}
                        </span>
                        <div>
                          <h3 className="text-base font-bold tracking-[-0.03em]">
                            {make.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {make.listings_count ?? 0} in stock
                          </p>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-xl text-muted-foreground"
                        onClick={(event) => {
                          event.stopPropagation()
                          catalog.setEditingMake(make)
                        }}
                        aria-label={`Edit ${make.name}`}
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 border-t px-4 py-3">
                    {models.map((model) => (
                      <span
                        key={model.id}
                        className="rounded-lg border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground"
                      >
                        {model.name}
                      </span>
                    ))}
                    <button
                      type="button"
                      className="rounded-lg border border-dashed border-amber-400 px-2.5 py-1 text-xs font-bold text-amber-700"
                      onClick={() => {
                        catalog.selectMake(make.id)
                        catalog.setIsCreateModelOpen(true)
                      }}
                    >
                      + Add model
                    </button>
                  </div>
                </AdminSurface>
              )
            })
          : null}

        <button
          type="button"
          className="grid min-h-36 place-items-center rounded-2xl border border-dashed bg-card/45 text-muted-foreground transition hover:border-primary/40 hover:bg-card"
          onClick={() => catalog.setIsCreateMakeOpen(true)}
        >
          <span className="grid gap-3 text-center text-sm font-bold">
            <span className="mx-auto grid size-10 place-items-center rounded-full bg-muted">
              <Plus className="size-4" />
            </span>
            Add new make
          </span>
        </button>
      </div>

      {catalog.selectedMake ? <ModelsPanel catalog={catalog} /> : null}
    </div>
  )
}

export default MakeModelCards
