<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Midtrans\Config;
use Midtrans\Snap;

// tidak berguna sebener e tapi biarkan saja
class MidtransService
{
    public function __construct() {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    public function initiatePayment($amount, $products, $user) {
        $transactionDetails = [
            'order_id' => uniqid(),
            'gross_amount' => $amount,
        ];

        $itemDetails = [];
        foreach ($products as $product) {
            $itemDetails[] = [
                'id' => $product->id,
                'price' => $product->price,
                'quantity' => 1,
                'name' => $product->name,
            ];
        }

        $customerDetails = [
            'first_name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
        ];

        $params = [
            'transaction_details' => $transactionDetails,
            'item_details' => $itemDetails,
            'customer_details' => $customerDetails,
            'expiry' => date('c', strtotime('+3 days')),
            // 'callbacks' => [
            //     'finish' => route('midtrans.finish'),
            //     'cancel' => route('midtrans.cancel'),
            // ],
        ];

        $snapToken = Snap::getSnapToken($params);
        return "https://app.sandbox.midtrans.com/snap/v2/vtweb/$snapToken";
    }
}