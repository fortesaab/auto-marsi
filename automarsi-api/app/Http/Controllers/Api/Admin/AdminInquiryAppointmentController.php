<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\Inquiries\ConvertInquiryToAppointment;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Inquiries\ConvertInquiryToAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Models\Inquiry;

class AdminInquiryAppointmentController extends Controller
{
    public function store(
        ConvertInquiryToAppointmentRequest $request,
        Inquiry $inquiry,
        ConvertInquiryToAppointment $convertInquiryToAppointment
    ): AppointmentResource {
        return new AppointmentResource(
            $convertInquiryToAppointment->handle($inquiry, $request->validated())
        );
    }
}
