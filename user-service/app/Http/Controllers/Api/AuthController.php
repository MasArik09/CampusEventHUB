<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * POST /api/users/register
     */
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // bcrypt
        ]);

        // Default role: student (Mahasiswa) sesuai PRD.md Target Users
        $studentRole = Role::firstOrCreate(['name' => 'student'], ['label' => 'Student']);
        $user->roles()->attach($studentRole->id);

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'data' => new UserResource($user->load('roles')),
        ], 201);
    }

    /**
     * POST /api/users/login
     */
    public function login(LoginRequest $request)
    {
        if (! Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
                'errors' => ['email' => ['Email or password is incorrect']],
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('user-service-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'token' => $token,
                'token_type' => 'Bearer',
                'user' => new UserResource($user->load('roles')),
            ],
        ]);
    }

    /**
     * POST /api/users/logout
     */
    public function logout()
    {
        $user = request()->user();
        $user->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout successful',
            'data' => [],
        ]);
    }
}
