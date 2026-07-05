<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('site_media')) {
            return;
        }

        Schema::table('site_media', function (Blueprint $table) {
            if (! Schema::hasColumn('site_media', 'sort_order')) {
                $table->unsignedInteger('sort_order')->default(0)->after('alt_text');
            }
        });

        DB::statement('DROP INDEX IF EXISTS site_media_key_unique');
    }

    public function down(): void
    {
        if (! Schema::hasTable('site_media')) {
            return;
        }

        Schema::table('site_media', function (Blueprint $table) {
            if (Schema::hasColumn('site_media', 'sort_order')) {
                $table->dropColumn('sort_order');
            }
        });
    }
};
