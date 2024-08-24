<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image');
            $table->decimal('price', 10, 2);
            $table->text('description');
            $table->string('slug')->unique();
            $table->decimal('discount', 5, 2)->default(0);
            $table->float('rating', 2)->default(0);
            $table->integer('total_rating')->default(0);
            $table->integer('stock');
            $table->integer('current_stock');
            $table->boolean('is_flash_sale')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
