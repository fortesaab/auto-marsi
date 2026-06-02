<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\AdminListingController;

Route::apiResource('listings', AdminListingController::class);
