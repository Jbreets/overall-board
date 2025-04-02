<?php 
include("auth.php");
// AJAX Test
$test = $_GET['k'];
if ($test == true) {
    // run sql total to get the new total value
    echo "£" . x_total("current"); 
    // print_r(x_total("current"));
}


// Grabs the current Justgiving total from the uevents database
function x_total($current_or_previous) {
    $con = db_conn();

    if($current_or_previous == "current") {
        $key = 0;
    } elseif ($current_or_previous == "previous") {
        $key = 1;
    }

    $sql = "SELECT * FROM ue_fundraising_overall_totals ORDER BY date_updated DESC LIMIT 2";
    $result = mysqli_query($con, $sql);

    $overall_data = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $total_sum = $overall_data[$key]['total'] + $overall_data[$key]['unlinked_total'] + $overall_data[$key]['gift_aid']; 

    $current_total = number_format($total_sum, 2); 

    return $current_total;
}


// calulates donation total over the past 24 hours
function x_daily_dontations($current_or_previous) {
    $con = db_conn();

    if($current_or_previous == "current") {
        $key1 = 0;
        $key2 = 2;
    } elseif ($current_or_previous == "previous") {
        $key1 = 2;
        $key2 = 4;
    }

    $sql = "SELECT * FROM ue_fundraising_overall_totals ORDER BY date_updated DESC LIMIT 5";
    $result = mysqli_query($con, $sql);
    $overall_data = mysqli_fetch_all($result, MYSQLI_ASSOC);


    $sum1 = $overall_data[$key1]['total'] + $overall_data[$key1]['unlinked_total'] + $overall_data[$key1]['gift_aid'];
    $sum2 = $overall_data[$key2]['total'] + $overall_data[$key2]['unlinked_total'] + $overall_data[$key2]['gift_aid'];


    $daily_total = $sum1 - $sum2; 
    $daily_total = number_format($daily_total, 2);
    return $daily_total;

}


// enter array value to get the value of the field you want
// eg fundraisers / currency / event_count
function get_x_value($array_val) {

    $con = db_conn();
    $sql = "SELECT * FROM ue_fundraising_overall_totals ORDER BY date_updated DESC LIMIT 3";
    $result = mysqli_query($con, $sql);
    $overall_data = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $x_val = $overall_data[0][$array_val]; 
    // print($x_val);

}
// get_x_value('fundraisers');

// Retrieves the number of sign ups from the CRM
function x_num_of_signups($current_or_previous) {
    $con = crm_conn();

    $sql = "SELECT count(ID) FROM ultraevents_crm.api_subscriber";
    $result = mysqli_query($con, $sql);
    $subscriber_export = mysqli_fetch_all($result, MYSQLI_ASSOC);
    $total_subscribers = $subscriber_export[0]["count(ID)"];


    if ($current_or_previous == "current") {
        $total_subscribers = $total_subscribers;
    } elseif ($current_or_previous == "previous") {
        $total_subscribers = $total_subscribers - x_num_of_signups24("current");
    }

    return $total_subscribers;
}

// Retrieves the number of sign ups from the CRM over the past 24 hours

function x_num_of_signups24($current_or_previous) {
    $con = crm_conn();

    if ($current_or_previous == "current") {

        $sql = "SELECT count(id) FROM ultraevents_crm.api_subscriber WHERE date_added > NOW() - INTERVAL 1 DAY";
        $result = mysqli_query($con, $sql);
        $subscriber_export = mysqli_fetch_all($result, MYSQLI_ASSOC);
        
        $total_subscribers = $subscriber_export[0]["count(id)"];
        
    } elseif ($current_or_previous == "previous") {
        $sql = "SELECT count(id) FROM ultraevents_crm.api_subscriber WHERE date_added > NOW() - INTERVAL 2 DAY";
        $result = mysqli_query($con, $sql);
        $subscriber_export = mysqli_fetch_all($result, MYSQLI_ASSOC);
        $total_subscribers = $subscriber_export[0]["count(id)"];

        $total_subscribers = $total_subscribers - x_num_of_signups24("current");
        
    }
    ;
     return $total_subscribers;
}


?>
