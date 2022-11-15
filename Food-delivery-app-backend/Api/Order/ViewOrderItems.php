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

        $url = $_SERVER['REQUEST_URI'];
        $url_components = parse_url($url);
        parse_str($url_components['query'], $params);


        $allheaders = getallheaders();
        $jwt = $allheaders['Authorization'];
        $secret_key = "mySecrectKeyPooja";
        $user_data = JWT::decode($jwt, $secret_key, array('HS256'));

        $order_id=$params['order_id'];;

        $obj->select('order_items', '*', null, "order_id='{$order_id}'", null, null);
        $orderItems = $obj->getResult();
        if ($orderItems) {
            echo json_encode([
                'status' => 1,
                'message' => 'Your Order items',
                'orderItems' => $orderItems,
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => "Your haven't Order Anything",
                'orderItem' => []
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
