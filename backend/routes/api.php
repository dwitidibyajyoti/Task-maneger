<?php

use App\Http\Controllers\TaskController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


// Route::post('response-date',function (Request $request)
// {

//     $time = strtotime($request->date);
//     $date = date('Y-m-d',$time);
//     $date = Carbon::parse($date);

//     $timeArray =[];
//     if($date->greaterThan(Carbon::now())){


//         $time24 = Carbon::createFromFormat('h:i A', $request->time)->addMinutes(30)->format('H:i');
//         $time12 = date("g:i a", strtotime($time24));

//     }else{
//         $time24 = Carbon::createFromFormat('h:i A', $request->time)->subMinutes(30)->format('H:i');
//         $time12 = date("g:i a", strtotime($time24));

//     }


//     array_push($timeArray,$time12);


//     if($date->greaterThan(Carbon::now())){
//         do {
//             $time24 = Carbon::createFromFormat('h:i A', $timeArray[count($timeArray)-1])->addMinutes(30)->format('H:i');
//             $time12 = date("g:i a", strtotime($time24));
//             array_push($timeArray,$time12);
//         } while (Carbon::createFromFormat('h:i A', $timeArray[count($timeArray)-1])->format('H') !== '12');

//     }else{
//         do {

//             $time24 = Carbon::createFromFormat('h:i A', $timeArray[count($timeArray)-1])->subMinutes(30)->format('H:i');
//             $time12 = date("g:i a", strtotime($time24));
//             array_push($timeArray,$time12);
//         } while (Carbon::createFromFormat('h:i A', $timeArray[count($timeArray)-1])->format('H') !== '12');

//     }

//     return response()->json(['date' => Carbon::parse($date)->format('Y-m-d'), 'time' => $timeArray]);

// });

Route::post('task/store',[TaskController::class,'store']);
Route::get('task/show',[TaskController::class,'show']);
Route::delete('task/delete/{id}',[TaskController::class,'destroy']);
Route::post('task/update/{id}',[TaskController::class,'update']);




