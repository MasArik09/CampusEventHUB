<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * GET /api/users/profile
     */
    public function show(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Success',
            'data' => new UserResource($request->user()->load(['roles', 'certificates'])),
        ]);
    }

    /**
     * PUT /api/users/profile
     */
    public function update(UpdateProfileRequest $request)
    {
        $user = $request->user();
        $user->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => new UserResource($user->load('roles')),
        ]);
    }
}
