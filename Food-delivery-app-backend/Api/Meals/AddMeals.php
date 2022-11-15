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

        $role = $user_data->data->role;
        if($role!=="ADMIN"){
            echo json_encode([
                'status' => 0,
                'message' => "Access Denied",
            ]);
        }else{
        $name = $data->name;
        $description = $data->description;
        $price = $data->price;

        $obj->insert('meals', ['name' => $name, 'description' => $description, 'price' => $price]);
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