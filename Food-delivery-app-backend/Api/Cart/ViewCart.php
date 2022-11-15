<?php
require_once('../../vendor/autoload.php');
include "../../Database/Database.php";

use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json');
header("Access-Control-Allow-Headers:Content-Type, Origin, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: POST,GET");
$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    try {
        
        $data = json_decode(file_get_contents("php://input"));
        $allheaders = getallheaders();
        $jwt = $allheaders['Authorization'];
        $secret_key = "mySecrectKeyPooja";
        $user_data = JWT::decode($jwt, $secret_key, array('HS256'));

        $user_id = $user_data->data->id;
    
       
        $obj->select('cart', '*', null, "user_id='{$user_id}'", null, null);
        $cart = $obj->getResult();
        if ($cart) {
            echo json_encode([
                'status' => 1,
                'message'=>'Your Cart',
                'meals' => $cart,
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => "Your Cart is Empty",
                'cart'=>[]
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            'status' => 0,
            'message' => $e->getMessage(),
        ]);
    }
} else {
    echo json_encode([
        'status' => 0,
        'message' => 'Access Denied',
    ]);
}