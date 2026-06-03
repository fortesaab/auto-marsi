<?php

use App\Http\Controllers\Api\Admin\AdminCarModelController;
use App\Http\Controllers\Api\Admin\AdminMakeController;
use App\Http\Controllers\Api\Admin\AdminVehicleFeatureController;
use App\Http\Controllers\Api\Admin\AdminListingController;
use App\Http\Controllers\Api\Admin\AdminListingImageController;
use Illuminate\Support\Facades\Route;

Route::apiResource('makes', AdminMakeController::class);
Route::apiResource('car-models', AdminCarModelController::class);
Route::apiResource('vehicle-features', AdminVehicleFeatureController::class);

Route::get('listings/{listing}/images', [AdminListingImageController::class, 'index']);
Route::post('listings/{listing}/images', [AdminListingImageController::class, 'store']);
Route::patch('listing-images/{listingImage}', [AdminListingImageController::class, 'update']);
Route::delete('listing-images/{listingImage}', [AdminListingImageController::class, 'destroy']);
Route::post('listing-images/{listingImage}/primary', [AdminListingImageController::class, 'primary']);

Route::apiResource('listings', AdminListingController::class);
