<?php
$latest = file_get_contents('https://robopanel.io/latestpanel.txt');
$current = config('app.version', 'Unable to find version!');
$trimmed = trim($latest, "\n");
?>

@include('components.sidebaradmin')

<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                @if($current == $trimmed)
                <div class="alert-success p-6 bg-white border-b border-gray-200">
                    You are running the latest version of RoboPanel! Latest: <?php echo $trimmed; ?>
                </div>
                @elseif($current != $trimmed)
                <div class="alert-danger p-6 bg-white border-b border-gray-200">
                    Your version of RoboPanel is not up to date! Your version: <?php echo $current; ?>. Latest: <?php echo $trimmed; ?>
                </div>
                @endif
            </div>
        </div>
    </div>
</x-app-layout>
