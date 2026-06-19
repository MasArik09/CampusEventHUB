<?php

namespace App\GraphQL\Mutations;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterUser
{
    public function __invoke($_, array $args): User
    {
        Validator::make($args, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ])->validate();

        $user = User::create([
            'name' => $args['name'],
            'email' => $args['email'],
            'password' => Hash::make($args['password']),
        ]);

        $studentRole = Role::firstOrCreate(['name' => 'student'], ['label' => 'Student']);
        $user->roles()->attach($studentRole->id);

        return $user->load('roles');
    }
}
