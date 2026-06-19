import type { AdminListing } from '../types'
import { useListingEditForm } from '../hooks/useListingEditForm'
import ListingForm from './ListingForm'

type ListingEditPanelProps = {
  listing: AdminListing
  onCancel: () => void
  onUpdated: () => void
}

function ListingEditPanel({
  listing,
  onCancel,
  onUpdated,
}: ListingEditPanelProps) {
  const editForm = useListingEditForm({
    listing,
    onUpdated,
  })

  return (
    <ListingForm
      heading="Edit listing"
      description="Update vehicle details, pricing, status, and features."
      submitLabel="Save changes"
      submittingLabel="Saving..."
      formState={editForm.formState}
      makes={editForm.makes}
      carModels={editForm.carModels}
      equipment={{
        features: editForm.equipment.features,
        suggestions: editForm.equipment.suggestions,
        isLoading: editForm.equipment.isLoading,
        isCreating:
          editForm.equipment.createFeatureMutation.isPending,
        catalogErrorMessage:
          editForm.equipment.catalogErrorMessage,
        presetErrorMessage:
          editForm.equipment.presetErrorMessage,
        onToggle: editForm.equipment.toggleFeature,
        onCreate: async (payload) =>
          editForm.equipment.createFeatureMutation.mutateAsync(payload),
        onRetry: () => {
          void editForm.equipment.retry()
        },
      }}
      isLoadingOptions={editForm.isLoadingOptions}
      isSubmitting={editForm.isSubmitting}
      errorMessage={editForm.errorMessage}
      onCancel={onCancel}
      onSubmit={editForm.submit}
      onFieldChange={editForm.updateField}
    />
  )
}

export default ListingEditPanel
