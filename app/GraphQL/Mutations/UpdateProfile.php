<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UpdateProfile
{
    public function __invoke($_, array $args, \Nuwave\Lighthouse\Support\Contracts\GraphQLContext $context): User
    {
        /** @var User $user */
        $user = $context->request()->user();

        Validator::make($args, [
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'unique:users,email,'.$user->id],
        ])->validate();

        $user->update(array_filter([
            'name' => $args['name'] ?? null,
            'email' => $args['email'] ?? null,
        ]));

        return $user->load('roles');
    }
}
