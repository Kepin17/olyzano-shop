<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('login', function (Request $request) {
            $key = 'login_attempts_' . $request->ip();

            $limit = Limit::perMinute(5)->by($key);

            if (RateLimiter::tooManyAttempts($key, 5)) {
                $waitSeconds = RateLimiter::availableIn($key);

                return response()->json([
                    'success' => false,
                    'message' => 'Terlalu banyak percobaan login. Coba lagi dalam ' . gmdate("i:s", $waitSeconds) . ' detik.',
                ], 429);
            }

            RateLimiter::hit($key);

            return $limit;
        });
    }
}
