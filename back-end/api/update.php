<?php
    require 'dbutil.php';

    // Get the posted data.
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata))
    {
    // Extract the data.
    $request = json_decode($postdata);


    // Validate.
    if((int)$request->ID < 1 || trim($request->EmployeeName) === '' || trim($request->EmployeeAddress) === '' || trim($request->Position) === '')
    {
        return http_response_code(400);
    }

    $ID = mysqli_real_escape_string($con, (int)$request->ID);
    $EmployeeName = mysqli_real_escape_string($con, trim($request->EmployeeName));
    $EmployeeAddress = mysqli_real_escape_string($con, trim($request->EmployeeAddress));
    $Position = mysqli_real_escape_string($con, trim($request->Position));

    $sql = "UPDATE `employee` SET `EmployeeName`='$EmployeeName',`EmployeeAddress`='$EmployeeAddress',`Position`='$Position' WHERE `ID` = {$ID} LIMIT 1";

    if(mysqli_query($con,$sql))
    {
        http_response_code(204);
    }
    else
    {
        http_response_code(422);
    }
}