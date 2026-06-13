import { useListingCreateForm } from '../hooks/useListingCreateForm'
import ListingCreateForm from './ListingCreateForm'

type ListingCreatePanelProps = {
  token: string
  onCancel: () => void
  onCreated: () => void
}

function ListingCreatePanel({
  token,
  onCancel,
  onCreated,
}: ListingCreatePanelProps) {
  const createForm = useListingCreateForm({ token, onCreated })

  return (
    <ListingCreateForm
      formState={createForm.formState}
      makes={createForm.makes}
      carModels={createForm.carModels}
      isLoadingOptions={createForm.isLoadingOptions}
      isSubmitting={createForm.isSubmitting}
      errorMessage={createForm.errorMessage}
      onCancel={onCancel}
      onSubmit={createForm.submit}
      onFieldChange={createForm.updateField}
      vehicleFeatures={createForm.vehicleFeatures}
      onFeatureToggle={createForm.toggleFeature}
    />
  )
}

export default ListingCreatePanel
