<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

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
            'origin' => '161', // Kode kota asal (Gunakan kode kota yang terterdaftar di Raja Ongkir)
            'destination' => $destination, // Kode kota tujuan (Gunakan kode kota yang terterdaftar di Raja Ongkir)
            'weight' => $weight, // Berat barang dalam gram (Gunakan satuan gram)
            'courier' => $courier, // Kode kurir (Gunakan kode kurir yang terterdaftar di Raja Ongkir)
        ]);

        $result = $response->json();
        if (isset($result['rajaongkir']['results'][0]['costs'])) {
            return $result['rajaongkir']['results'][0]['costs'][0]['cost'][0]['value'];
        }

        throw new \Exception('Gagal menghitung biaya pengiriman');
    }
}