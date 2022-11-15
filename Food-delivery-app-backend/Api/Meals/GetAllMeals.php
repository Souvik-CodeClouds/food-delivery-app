<?php


header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST');
header('Content-Type:application/json');
include "../../Database/Database.php";

$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    try {
        $data = json_decode(file_get_contents("php://input"));

        $obj->select('meals', "*", null, null, null , null);
        $products = $obj->getResult();
        if ($products) {
            echo json_encode([
                'status' => 1,
                'message'=>'Available Meals',
                'meals' => $products,
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => "server problem",
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