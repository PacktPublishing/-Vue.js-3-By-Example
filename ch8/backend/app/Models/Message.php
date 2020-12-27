<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'message', 'chat_id', 'user_id',
    ];

    public function chat()
    {
        return $this->belongsTo('App\Models\Chat');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
