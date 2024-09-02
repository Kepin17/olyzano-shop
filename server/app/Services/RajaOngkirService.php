<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

// tidak berguna sebener e tapi biarkan saja
class RajaOngkirService
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct() {
        $this->apiKey = config('services.rajaongkir.api_key');
        $this->baseUrl = config('services.rajaongkir.base_url');
    }

    public function calculateShippingCost($destination, $courier, $weight = 1000) {
        $response = Http::withHeaders([
            'key' => $this->apiKey,
        ])->post("{$this->baseUrl}/cost", [
            'origin' => '161', 
            'destination' => $destination, 
            'weight' => $weight, 
            'courier' => $courier,
        ]);

        $result = $response->json();
        if (isset($result['rajaongkir']['results'][0]['costs'])) {
            return $result['rajaongkir']['results'][0]['costs'][0]['cost'][0]['value'];
        }

        throw new \Exception('Gagal menghitung biaya pengiriman');
    }
}