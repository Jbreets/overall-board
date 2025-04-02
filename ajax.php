<?php
// Need page for AJAX calls since functions is included in index page it wont work
include("functions.php"); 

// suuccessfully pulls new data from all locations and echoes back into the hidden data area
// var_dump($_GET);
$value1 = x_total("current");
$value2 = x_total("previous");
$value3 = x_daily_dontations("current");
$value4 = x_daily_dontations("previous");
$value5 = x_num_of_signups("current");
$value6 = x_num_of_signups("previous");
$value7 = x_num_of_signups24("current");
$value8 = x_num_of_signups24("previous");

// Create an associative array with both values
$response = array(
    'value1' => $value1,
    'value2' => $value2,
    'value3' => $value3,
    'value4' => $value4,
    'value5' => $value5,
    'value6' => $value6,
    'value7' => $value7,
    'value8' => $value8
);

// Encode the array into JSON format and echo it
echo json_encode($response);
?>