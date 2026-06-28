<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement(
            'CREATE INDEX IF NOT EXISTS listings_status_published_at_index ON listings (status, published_at)'
        );

        DB::statement(
            'CREATE INDEX IF NOT EXISTS listings_status_created_at_index ON listings (status, created_at)'
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP INDEX IF EXISTS listings_status_published_at_index');
        DB::statement('DROP INDEX IF EXISTS listings_status_created_at_index');
    }
};
