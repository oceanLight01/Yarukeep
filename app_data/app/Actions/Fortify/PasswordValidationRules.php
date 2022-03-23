<?php

namespace App\Actions\Fortify;

use Laravel\Fortify\Rules\Password;
use Illuminate\Validation\Rules\Password as PasswordValidation;

trait PasswordValidationRules
{
    /**
     * Get the validation rules used to validate passwords.
     *
     * @return array
     */
    protected function passwordRules()
    {
        return [
            'required',
            'string',
            new Password,
            'confirmed',
            PasswordValidation::min(8)
                              ->letters()
                              ->mixedCase()
                              ->numbers(),
        ];
    }
}
