import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAdminToken } from '@/hooks/useAdminToken'
import {
  createAdminAppointment,
  getAdminAppointments,
  updateAdminAppointment,
  updateAdminAppointmentStatus,
} from '../api/appointmentsApi'
import type {
  AppointmentFormPayload,
  AppointmentStatus,
} from '../types'

type UseAdminAppointmentsParams = {
  search: string
  status: AppointmentStatus | ''
  listingId: string
  page: number
}

export function useAdminAppointments({
  search,
  status,
  listingId,
  page,
}: UseAdminAppointmentsParams) {
  const queryClient = useQueryClient()
  const { isAuthReady, getAdminToken } = useAdminToken()

  const queryKey = [
    'admin',
    'appointments',
    { search, status, listingId, page },
  ]

  const appointmentsQuery = useQuery({
    queryKey,
    enabled: isAuthReady,
    staleTime: 15_000,
    queryFn: async () => {
      const token = await getAdminToken()

      return getAdminAppointments({
        token,
        search,
        status,
        listingId,
        page,
      })
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      appointmentId,
      nextStatus,
    }: {
      appointmentId: number
      nextStatus: AppointmentStatus
    }) => {
      const token = await getAdminToken()

      return updateAdminAppointmentStatus({
        token,
        appointmentId,
        status: nextStatus,
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin', 'appointments'] })
      toast.success('Appointment status updated.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update appointment.'
      )
    },
  })

  const createAppointmentMutation = useMutation({
    mutationFn: async (payload: AppointmentFormPayload) => {
      const token = await getAdminToken()

      return createAdminAppointment({ token, payload })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['admin', 'appointments'],
      })
      toast.success('Appointment created.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to create appointment.'
      )
    },
  })

  const editAppointmentMutation = useMutation({
    mutationFn: async ({
      appointmentId,
      payload,
    }: {
      appointmentId: number
      payload: AppointmentFormPayload
    }) => {
      const token = await getAdminToken()

      return updateAdminAppointment({
        token,
        appointmentId,
        payload,
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['admin', 'appointments'],
      })
      toast.success('Appointment updated.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update appointment.'
      )
    },
  })

  return {
    appointments: appointmentsQuery.data?.data ?? [],
    meta: appointmentsQuery.data?.meta ?? {
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0,
    },
    appointmentsQuery,
    updateStatusMutation,
    createAppointmentMutation,
    editAppointmentMutation,
    errorMessage:
      appointmentsQuery.error instanceof Error
        ? appointmentsQuery.error.message
        : null,
  }
}
