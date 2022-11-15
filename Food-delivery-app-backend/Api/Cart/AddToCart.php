<?php
require_once('../../vendor/autoload.php');
include "../../Database/Database.php";

use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json');
header("Access-Control-Allow-Headers:Content-Type, Origin, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: POST");

$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    try {
        
        $data = json_decode(file_get_contents("php://input"));
        $allheaders = getallheaders();
        $jwt = $allheaders['Authorization'];
        $secret_key = "mySecrectKeyPooja";
        $user_data = JWT::decode($jwt, $secret_key, array('HS256'));

        $user_id = $user_data->data->id;
       
        $meal_id= $data->id;
        $meal_name = $data->name;
        $meal_amount =$data->amount;
        $price = $data->price;
       
        $obj->select('cart', '*', null, "user_id='{$user_id}' AND meal_id={$meal_id}", null, null);
        $result = $obj->getResult();
        if(count($result)>0){
            foreach ($result as $data) {
                $amt= $data['amount'];
            }
            $amt=$amt+$meal_amount;
            $obj->update('cart', ['amount'=>$amt],"user_id='{$user_id}' AND meal_id={$meal_id}");
            $result=$obj->getResult();

            if ($result[0] == 1) {
                echo json_encode([
                    'status' => 1,
                    'message' => "Product Add Successfully",
                ]);
            } else {
                echo json_encode([
                    'status' => 0,
                    'message' => "Server Problem",
                ]);
            }
        }
       
        else{
        $obj->insert('cart', ['user_id' => $user_id, 'meal_id' => $meal_id, 'meal_name' => $meal_name,'amount'=>$meal_amount ,'price' => $price]);
        $result = $obj->getResult();
        if ($result[0] == 1) {
            echo json_encode([
                'status' => 1,
                'message' => "Product Add Successfully",
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => "Server Problem",
            ]);
        }
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