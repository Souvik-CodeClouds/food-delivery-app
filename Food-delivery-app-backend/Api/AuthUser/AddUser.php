<?php



include "../../Database/Database.php";
header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json');
header("Access-Control-Allow-Headers:Content-Type, Origin, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: POST");
$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    try {
        $data = json_decode(file_get_contents("php://input"));

        $user_id = $data->Userid;
        $name = $data->name;
        $email = $data->email;
        $password = $data->password;
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $obj->select('users', "*", null, "email='{$email}'", null, null);
        $result = $obj->getResult();
        if (count($result) > 0) {

            echo json_encode([
                'status' => 0,
                'message' => "User email arleady Exist",
            ]);
        } else {
            $obj->insert('users', ['user_id' => $user_id, 'name' => $name, 'email' => $email, 'password' => $hashed_password]);
            $result = $obj->getResult();
            if ($result[0] == 1) {
                echo json_encode([
                    'status' => 1,
                    'message' => "New User Created",
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
