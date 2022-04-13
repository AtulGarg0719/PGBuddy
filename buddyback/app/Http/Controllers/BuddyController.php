<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserModel;


class BuddyController extends Controller
{
    //

    public function LoginAction(Request $request){

        if($request->name != ''){

            $user_detl = UserModel::where('name',$request->name)->first();

            if($request->password == $user_detl->password){
                return response()->json(['status' => 200, 'msg' =>'User Login Successfully','user' => $user_detl]);
            }
            else{
               return response()->json(['status' => 201, 'msg' =>'User Login Unsuccessfully']); 
            }
        }
        else{
            return response()->json(['status' => 201, 'msg' =>'User Does Not Exits']); 
        }

        

        
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
