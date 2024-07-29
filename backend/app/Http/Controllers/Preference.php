<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Preferences;

class Preference extends Controller
{
    //
    public function savePreferences(Request $request)
    {
    
        $data = [
            'preferred_source' => isset($request->preferred_source) ? $request->preferred_source : [],
            'preferred_category' => isset($request->preferred_category) ? $request->preferred_category : [],
            'preferred_author' => isset($request->preferred_author) ? $request->preferred_author : [],
        ];

        try {
            $preference = Preferences::updateOrCreate(
                ['user_id' => $request->user_id], 
                $data 
            );
            return response()->json($preference, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function getPreferences(Request $request)
    {
        $preference = Preferences::where('user_id', $request->user_id)->first();

        return response()->json($preference);
    }
}
