<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserModel;


class BuddyController extends Controller
{
    //

    public function LoginAction(Request $request){

        
    }

    public function Register(Request $request){

        $users = new UserModel;

        $users->name = $request->name;
        $users->email = $request->email;
        $users->password = $request->password;

        $users->save();

        return response()->json([
            'status' => 200, 'msg' =>'User Added Successfully'
        ]);

    }
}
