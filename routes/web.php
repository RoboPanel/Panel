<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/laravel', function () {
    return view('welcome');
})->middleware(['auth'])->name('home');

Route::get('/', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/getlatest', function () {
    return view('getlatest');
});

Route::get('/admin', function () {
    if(Auth::user()->admin === 'true'){}
    else {
    return redirect('/');
    }
    return view('adminhome');
})->middleware(['auth'])->name('adminhome');

require __DIR__.'/auth.php';
