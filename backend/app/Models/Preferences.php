<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preferences extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'preferred_source', 
        'preferred_category', 
        'preferred_author'
    ];

    protected $casts = [
        'preferred_source' => 'array',
        'preferred_category' => 'array',
        'preferred_author' => 'array',
    ];


    public function user()
        {
            return $this->belongsTo(User::class);
        }
   
}
