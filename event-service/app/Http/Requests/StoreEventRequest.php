<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location'    => ['required', 'string'],
            'start_date'  => ['required', 'date'],
            'end_date'    => ['required', 'date', 'after_or_equal:start_date'],
            'quota'       => ['required', 'integer', 'min:1'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'created_by'  => ['required', 'integer'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'            => 'Judul event wajib diisi.',
            'description.required'      => 'Deskripsi event wajib diisi.',
            'location.required'         => 'Lokasi event wajib diisi.',
            'start_date.required'       => 'Tanggal mulai wajib diisi.',
            'end_date.required'         => 'Tanggal selesai wajib diisi.',
            'end_date.after_or_equal'   => 'Tanggal selesai harus sama atau setelah tanggal mulai.',
            'quota.required'            => 'Kuota event wajib diisi.',
            'quota.min'                 => 'Kuota minimal 1 peserta.',
            'category_id.required'      => 'Kategori event wajib dipilih.',
            'category_id.exists'        => 'Kategori yang dipilih tidak valid.',
            'created_by.required'       => 'ID pembuat event wajib diisi.',
        ];
    }
}
