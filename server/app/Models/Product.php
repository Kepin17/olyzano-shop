<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'price',
        'description',
        'slug',
        'category',
        'discount',
        'rating',
        'total_rating',
        'stock',
        'current_stock',
        'is_flash_sale',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount' => 'decimal:2',
        'rating' => 'float',
        'total_rating' => 'integer',
        'stock' => 'integer',
        'current_stock' => 'integer',
        'is_flash_sale' => 'boolean',
    ];
}
