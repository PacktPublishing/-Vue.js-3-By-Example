<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Chat;

class ChatController extends Controller
{
    public function get(Request $request)
    {
        return Chat::find($request->id);
    }

    public function getAll(Request $request)
    {
        return Chat::all();
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $chat = Chat::create([
            'name' => $request->get('name'),
        ]);

        return response()->json($chat, 201);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $chat = Chat::find($request->id);
        $chat->name =  $request->get('name');
        $chat->save();

        return response()->json($chat);
    }

    public function delete(Request $request)
    {
        $chat = Chat::find($request->id);
        $chat->delete();
        return response(null, 200);
    }
}
