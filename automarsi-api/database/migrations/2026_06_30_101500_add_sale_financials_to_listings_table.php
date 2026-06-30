<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('listings', function (Blueprint $table) {
            $table->decimal('purchase_price', 12, 2)->nullable()->after('price');
            $table->decimal('sale_price', 12, 2)->nullable()->after('purchase_price');
            $table->decimal('sales_expenses', 12, 2)->default(0)->after('sale_price');
            $table->text('sale_notes')->nullable()->after('sales_expenses');
        });
    }

    public function down(): void
    {
        Schema::table('listings', function (Blueprint $table) {
            $table->dropColumn([
                'purchase_price',
                'sale_price',
                'sales_expenses',
                'sale_notes',
            ]);
        });
    }
};
