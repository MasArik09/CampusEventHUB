<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            // PRD.md - Business Rules: Email harus unik
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            // PRD.md - Business Rules: Password minimal 8 karakter
            'password' => ['required', 'string', 'min:8'],
        ];
    }
}
