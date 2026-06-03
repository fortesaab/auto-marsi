<?php

use App\Http\Controllers\Api\Admin\AdminCarModelController;
use App\Http\Controllers\Api\Admin\AdminMakeController;
use App\Http\Controllers\Api\Admin\AdminVehicleFeatureController;
use App\Http\Controllers\Api\Admin\AdminListingController;
use Illuminate\Support\Facades\Route;

Route::apiResource('makes', AdminMakeController::class);
Route::apiResource('car-models', AdminCarModelController::class);
Route::apiResource('vehicle-features', AdminVehicleFeatureController::class);
Route::apiResource('listings', AdminListingController::class);
