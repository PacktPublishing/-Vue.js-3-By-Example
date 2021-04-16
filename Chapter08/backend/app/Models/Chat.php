<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Chat extends Model
{
    protected $fillable = [
        'name'
    ];

    public function messages()
    {
        return $this->hasMany('App\Models\Message');
    }
}
