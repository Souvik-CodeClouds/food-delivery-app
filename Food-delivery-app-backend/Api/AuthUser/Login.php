<?php
require_once('../../vendor/autoload.php');
include "../../Database/Database.php";

use Firebase\JWT\JWT;


header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json');
header("Access-Control-Allow-Headers:Content-Type, Origin, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: POST");





$obj = new Database();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input", true));
    $email = htmlentities($data->email);
    $password = htmlentities($data->password);

    $obj->select('users', '*', null, "email='{$email}'", null, null);
    $datas = $obj->getResult();
    if (count($datas) === 0) {
        echo json_encode([
            'status' => 0,
            'message' => "User Does't Exist",
        ]);
    }
    foreach ($datas as $data) {
        $id = $data['user_id'];
        $email = $data['email'];
        $name = $data['name'];
        $role = $data['role'];
        if (!password_verify($password, $data['password'])) {
            echo json_encode([
                'status' => 0,
                'message' => 'Invalid Credentials',
            ]);
        } else {
            $payload = [
                'iss' => "localhost",
                'aud' => 'localhost',
                'exp' => time() + 2592000000, //30 days
                'data' => [
                    'id' => $id,
                    'name' => $name,
                    'email' => $email,
                    'role' => $role,
                ],
            ];
            $secret_key = "mySecrectKeyPooja";
            $jwt = JWT::encode($payload, $secret_key, 'HS256');
            echo json_encode([
                'status' => 1,
                'jwt' => $jwt,
                'message' => 'Login Successfully',
                'id' => $id,
                'name' => $name,
                'email' => $email,
                'role' => $role,
            ]);
        }
    }
} else {
    echo json_encode([
        'status' => 0,
        'message' => 'Access Denied',
    ]);
}
