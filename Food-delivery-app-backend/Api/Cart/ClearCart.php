<?php
require_once('../../vendor/autoload.php');
include "../../Database/Database.php";

use Firebase\JWT\JWT;

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST');
header('Content-Type:application/json');

$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'DELETE') {
    try {

        $data = json_decode(file_get_contents("php://input"));
        $allheaders = getallheaders();
        $jwt = $allheaders['Authorization'];
        $secret_key = "mySecrectKeyPooja";
        $user_data = JWT::decode($jwt, $secret_key, array('HS256'));

        $user_id = $user_data->data->id;

        $obj->delete("cart", "user_id={$user_id}");
        $result = $obj->getResult();
        if ($result[0] == 1) {
            echo json_encode([
                'status' => 1,
                'message' => "Meal Removed",
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => "Server Problem",
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
