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
        Schema::table('listing_images', function (Blueprint $table) {
            $table->string('disk')->default('public')->after('listing_id');
            $table->string('path')->nullable()->after('disk');
            $table->string('original_name')->nullable()->after('image_url');
            $table->string('mime_type')->nullable()->after('original_name');
            $table->unsignedBigInteger('size')->nullable()->after('mime_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('listing_images', function (Blueprint $table) {
            $table->dropColumn([
                'disk',
                'path',
                'original_name',
                'mime_type',
                'size',
            ]);
        });
    }
};
