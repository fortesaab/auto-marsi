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
        Schema::table('appointments', function (Blueprint $table) {
            $table->foreignId('inquiry_id')
                ->nullable()
                ->after('listing_id')
                ->constrained()
                ->nullOnDelete();
            $table->index(['inquiry_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->dropIndex(['inquiry_id', 'status']);
            $table->dropConstrainedForeignId('inquiry_id');
        });
    }
};
