import { useListingCreateForm } from '../hooks/useListingCreateForm'
import ListingForm from './ListingForm'

type ListingCreatePanelProps = {
  onCancel: () => void
  onCreated: () => void
}

function ListingCreatePanel({
  onCancel,
  onCreated,
}: ListingCreatePanelProps) {
  const createForm = useListingCreateForm({ onCreated })

  return (
    <ListingForm
      heading="Add listing"
      description="Create a vehicle listing for the dealership inventory."
      submitLabel="Create listing"
      submittingLabel="Creating..."
      formState={createForm.formState}
      makes={createForm.makes}
      carModels={createForm.carModels}
      equipment={{
        features: createForm.equipment.features,
        suggestions: createForm.equipment.suggestions,
        isLoading: createForm.equipment.isLoading,
        isCreating:
          createForm.equipment.createFeatureMutation.isPending,
        catalogErrorMessage:
          createForm.equipment.catalogErrorMessage,
        presetErrorMessage:
          createForm.equipment.presetErrorMessage,
        onToggle: createForm.equipment.toggleFeature,
        onCreate: async (payload) =>
          createForm.equipment.createFeatureMutation.mutateAsync(payload),
        onRetry: () => {
          void createForm.equipment.retry()
        },
      }}
      isLoadingOptions={createForm.isLoadingOptions}
      isSubmitting={createForm.isSubmitting}
      errorMessage={createForm.errorMessage}
      onCancel={onCancel}
      onSubmit={createForm.submit}
      onFieldChange={createForm.updateField}
    />
  )
}

export default ListingCreatePanel
