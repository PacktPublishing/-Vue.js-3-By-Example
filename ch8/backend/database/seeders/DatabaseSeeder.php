<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Chat;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->addUsers();
        $this->addChats();
        $this->addMessages();
    }

    private function addUsers()
    {
        for ($x = 0; $x <= 1; $x++) {
            DB::table('users')->insert([
                'name' => 'user'.$x,
                'email' => 'user'.$x.'@gmail.com',
                'password' => Hash::make('password'),
            ]);
        }
    }

    private function addChats()
    {
        for ($x = 0; $x <= 1; $x++) {
            DB::table('chats')->insert([
                'name' => 'chat '.$x,
            ]);
        }
    }

    private function addMessages()
    {
        for ($x = 0; $x <= 1; $x++) {
            DB::table('messages')->insert([
                'message' => 'hello',
                'user_id' => User::all()->get(0)->id,
                'chat_id' => Chat::all()->get($x)->id
            ]);

            DB::table('messages')->insert([
                'message' => 'how are you',
                'user_id' => User::all()->get(1)->id,
                'chat_id' => Chat::all()->get($x)->id
            ]);
        }
    }
}
