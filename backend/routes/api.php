<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\Preference;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



// Register
Route::post('/register', [AuthController::class, 'register']);
// Login
Route::post('/login', [AuthController::class, 'login']);
// sources
Route::get('/sources', [FeatureController::class, 'getSources']);
// categories
Route::get('/categories', [FeatureController::class, 'getCategories']);
// categories
Route::get('/authors', [FeatureController::class, 'getAuthors']);
// search
Route::post('/search', [FeatureController::class, 'search']);
// preference
Route::post('/preference', [FeatureController::class, 'preferenceSearch']);

//save preference
Route::post('/update_preference', [Preference::class, 'savePreferences']);

//get preference
Route::post('/user_preference', [Preference::class, 'getPreferences']);


