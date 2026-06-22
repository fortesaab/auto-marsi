<?php

use App\Http\Controllers\Api\Admin\AdminAppointmentController;
use App\Http\Controllers\Api\Admin\AdminCarModelController;
use App\Http\Controllers\Api\Admin\AdminInquiryController;
use App\Http\Controllers\Api\Admin\AdminListingController;
use App\Http\Controllers\Api\Admin\AdminListingImageController;
use App\Http\Controllers\Api\Admin\AdminMakeController;
use App\Http\Controllers\Api\Admin\AdminVehicleCatalogImportController;
use App\Http\Controllers\Api\Admin\AdminVehicleFeatureController;
use App\Http\Controllers\Api\Admin\CarModelFeatureSuggestionsController;
use App\Http\Controllers\Api\Admin\AdminInquiryAppointmentController;
use Illuminate\Support\Facades\Route;

Route::apiResource('makes', AdminMakeController::class);

Route::get(
    'car-models/{carModel}/feature-suggestions',
    [CarModelFeatureSuggestionsController::class, 'index']
);
Route::put(
    'car-models/{carModel}/feature-suggestions',
    [CarModelFeatureSuggestionsController::class, 'update']
);
Route::apiResource('car-models', AdminCarModelController::class);

Route::post('vehicle-features/defaults', [AdminVehicleFeatureController::class, 'installDefaults']);
Route::apiResource('vehicle-features', AdminVehicleFeatureController::class);

Route::get('inquiries', [AdminInquiryController::class, 'index']);
Route::get('inquiries/{inquiry}', [AdminInquiryController::class, 'show']);
Route::patch('inquiries/{inquiry}', [AdminInquiryController::class, 'update']);
Route::post('inquiries/{inquiry}/appointment', [AdminInquiryAppointmentController::class, 'store']);

Route::get('appointments', [AdminAppointmentController::class, 'index']);
Route::post('appointments', [AdminAppointmentController::class, 'store']);
Route::get('appointments/{appointment}', [AdminAppointmentController::class, 'show']);
Route::patch('appointments/{appointment}', [AdminAppointmentController::class, 'update']);

Route::get('catalog-import/models', [AdminVehicleCatalogImportController::class, 'models']);
Route::post('catalog-import/models', [AdminVehicleCatalogImportController::class, 'importModels']);

Route::prefix('listings/{listing}')->group(function () {
    Route::get('images', [AdminListingImageController::class, 'index']);
    Route::post('images', [AdminListingImageController::class, 'store']);
});

Route::patch('listing-images/{listingImage}', [AdminListingImageController::class, 'update']);
Route::delete('listing-images/{listingImage}', [AdminListingImageController::class, 'destroy']);
Route::post('listing-images/{listingImage}/primary', [AdminListingImageController::class, 'primary']);

Route::apiResource('listings', AdminListingController::class);
