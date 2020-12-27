<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Message;
use App\Events\MessageSent;

class MessageController extends Controller
{
    public function getAll(Request $request)
    {
        return Message::with(['user', 'chat'])
            ->where('chat_id', $request->chat_id)
            ->get();
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'message' => 'required|string|max:2500',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $message = Message::create([
            'message' => $request->get('message'),
            'chat_id' => $request->get('chat_id'),
            'user_id' => $request->get('user_id')
        ]);

        $user = Auth::user();
        event(new MessageSent($user, $message));
        return response()->json($message, 201);
    }
}
