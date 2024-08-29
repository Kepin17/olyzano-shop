<?php

namespace App\Models;

use App\Models\OrderItem;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_price',
        'shipping_cost',
        'status'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // public static function boot()
    // {
    //     parent::boot();

    //     static::created(function ($order) {
    //         Log::info('Order created:', $order->toArray());
    //     });
    // }
}
