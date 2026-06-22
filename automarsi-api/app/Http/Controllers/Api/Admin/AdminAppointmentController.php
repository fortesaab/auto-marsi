<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\Appointments\UpdateAppointment;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Appointments\IndexAppointmentsRequest;
use App\Http\Requests\Admin\Appointments\UpdateAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use App\Queries\AdminAppointmentQuery;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use App\Actions\Appointments\CreateAppointment;
use App\Http\Requests\Admin\Appointments\StoreAppointmentRequest;

class AdminAppointmentController extends Controller
{
    public function index(
        IndexAppointmentsRequest $request,
        AdminAppointmentQuery $query
    ): AnonymousResourceCollection {
        return AppointmentResource::collection(
            $query->paginate($request->validated())
        );
    }

    public function show(Appointment $appointment): AppointmentResource
    {
        return new AppointmentResource(
            $appointment->load(['listing.make', 'listing.carModel'])
        );
    }

    public function update(
        UpdateAppointmentRequest $request,
        Appointment $appointment,
        UpdateAppointment $updateAppointment
    ): AppointmentResource {
        return new AppointmentResource(
            $updateAppointment->handle($appointment, $request->validated())
        );
    }

    public function store(
        StoreAppointmentRequest $request,
        CreateAppointment $createAppointment
    ): AppointmentResource {
        return new AppointmentResource(
            $createAppointment->handle($request->validated())
        );
    }
}
