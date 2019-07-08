<?php
    require 'dbutil.php';

    $id = $_GET["id"];
    $employees = [];
    $sql = "SELECT ID,`EmployeeName`,`EmployeeAddress`,`Position` FROM employee WHERE ID = $id";

    if($result = mysqli_query($con,$sql))
    {
        $i = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $employees[$i]['ID']    = $row['ID'];
            $employees[$i]['EmployeeName'] = $row['EmployeeName'];
            $employees[$i]['EmployeeAddress'] = $row['EmployeeAddress'];
            $employees[$i]['Position'] = $row['Position'];
            $i++;
        }

        echo json_encode($employees);
    }
    else
    {
        http_response_code(404);
    }
?>