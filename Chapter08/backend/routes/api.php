<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register', [UserController::class, 'register']);

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::group([
    'middleware' => ['api', 'jwt.verify'],
    'prefix' => 'chat'
], function () {
    Route::get('{id}', [ChatController::class, 'get']);
    Route::get('', [ChatController::class, 'getAll']);
    Route::post('create', [ChatController::class, 'create']);
    Route::put('update/{id}', [ChatController::class, 'update']);
    Route::delete('delete/{id}', [ChatController::class, 'delete']);
});

Route::group([
    'middleware' => ['api', 'jwt.verify'],
    'prefix' => 'message'
], function () {
    Route::get('{chat_id}', [MessageController::class, 'getAll']);
    Route::post('create', [MessageController::class, 'create']);
});


