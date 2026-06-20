<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'required', 'string'],
            'location'    => ['sometimes', 'required', 'string'],
            'start_date'  => ['sometimes', 'required', 'date'],
            'end_date'    => ['sometimes', 'required', 'date', 'after_or_equal:start_date'],
            'quota'       => ['sometimes', 'required', 'integer', 'min:1'],
            'category_id' => ['sometimes', 'required', 'integer', 'exists:categories,id'],
            'status'      => ['sometimes', 'in:draft,published,finished'],
        ];
    }

    public function messages(): array
    {
        return [
            'end_date.after_or_equal' => 'Tanggal selesai harus sama atau setelah tanggal mulai.',
            'quota.min'               => 'Kuota minimal 1 peserta.',
            'category_id.exists'      => 'Kategori yang dipilih tidak valid.',
            'status.in'               => 'Status tidak valid. Pilih: draft, published, atau finished.',
        ];
    }
}
