<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * RBAC middleware - SYSTEM_DESIGN.md Section 11 Security Design
 * Roles: admin, committee, student
 *
 * Usage di routes: ->middleware('role:admin') atau ->middleware('role:admin,committee')
 */
class EnsureRole
{
    public function handle(Request $request, Closure $next, string $roles): Response
    {
        $allowedRoles = explode(',', $roles);
        $user = $request->user();

        if (! $user || ! $user->roles()->whereIn('name', $allowedRoles)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden. You do not have permission to access this resource.',
                'errors' => [],
            ], 403);
        }

        return $next($request);
    }
}
