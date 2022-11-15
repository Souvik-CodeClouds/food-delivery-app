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
        $date = date("Y-m-d H:i:s");
        $res = str_ireplace( array( '-',' ',':' ), '', $date);
        $orderid = uniqid() . "" . $res;

        $datass = json_decode(file_get_contents("php://input"));
        $Street = $datass->street;
        $city = $datass->city;
        $postalCode = $datass->PostalCode;
        $address = $Street . " " . $city;
        $totalPrice = $datass->totalPrice;
        $datas = $datass->items;
        $obj->insert('orders', ['order_id' => $orderid, 'time' => $date, 'postalCode' => $postalCode, 'totalPrice' => $totalPrice, 'address' => $address, 'user_id' => $user_id]);


        $result = $obj->getResult();
        if ($result[0] == 1) {

            foreach ($datas as $data) {
                $array = json_decode(json_encode($data));
                $meal_name = $array->name;
                $meal_id = $array->id;
                $amount = $array->amount;
                $price = $array->price;
                $obj->insert('order_items', ['name' => $meal_name, 'meal_id' => $meal_id, 'amount' => $amount, 'price' => $price, 'order_id' => $orderid,]);
            }


            $obj->delete("cart", "user_id='{$user_id}'");
            $result = $obj->getResult();
            if ($result[0] == 1) {
                echo json_encode([
                    'status' => 1,
                    'message' => "Order Succesfull",
                ]);
            } else {
                echo json_encode([
                    'status' => 0,
                    'message' => "Server Problem",
                ]);
            }
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
