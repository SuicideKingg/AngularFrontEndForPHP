<?php
    require 'dbutil.php';

    // Get the posted data.
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata))
    {
    // Extract the data.
    $request = json_decode($postdata);


    // Validate.
    if(trim($request->EmployeeName) === '' || trim($request->EmployeeAddress) === '' || trim($request->Position) === '')
    {
        return http_response_code(400);
    }

    // Sanitize.
    $EmployeeName = mysqli_real_escape_string($con, trim($request->EmployeeName));
    $EmployeeAddress = mysqli_real_escape_string($con, trim($request->EmployeeAddress));
    $Position = mysqli_real_escape_string($con, trim($request->Position));


    // Create.
    $sql = "INSERT INTO `employee`(`ID`,`EmployeeName`,`EmployeeAddress`,`Position`) VALUES (null,'{$EmployeeName}','{$EmployeeAddress}','{$Position}')";

    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
        $employee = [
            'EmployeeName' => $EmployeeName,
            'EmployeeAddress' => $EmployeeAddress,
            'Position' => $Position,
            'ID'    => mysqli_insert_id($con)
        ];
        echo json_encode($employee);
    }
    else
    {
        http_response_code(422);
    }
}