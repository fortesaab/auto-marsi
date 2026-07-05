<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Firebase\JWT\JWK;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class VerifyClerkToken
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if(! $token){
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        try {
            $jwks = Cache::remember('clerk_jwks', now()->addHour(), function () {
                return Http::get(config('clerk.jwks_url'))->json();
            });

            $payload = JWT::decode($token, JWK::parseKeySet($jwks));

            $user = User::updateOrCreate(
                ['clerk_id' => $payload->sub],
                [
                    'email' => $payload->email ?? null,
                    'name' => $payload->name ?? 'Clerk User',
                ]
            );

            $adminEmails = collect(explode(',', config('automarsi.admin_emails', '')))
                ->map(fn ($email) => strtolower(trim($email)))
                ->filter();

            if ($user->email && $adminEmails->contains(strtolower($user->email))) {
                $user->forceFill(['role' => 'admin'])->save();
            }

            Auth::setUser($user);
        } catch (Throwable) {
            return response()->json(['message' => 'Invalid token.'], 401);
        }

        return $next($request);
    }
}
