<?php
    // Require the credentials
    require_once 'db.conf';

    // Connect to the database
    $mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

    // Check for errors
    if ($mysqli->connect_error) {
        $error = 'Error: ' . $mysqli->connect_errno . ' ' . $mysqli->connect_error;
        exit;
    }
    $query = "SELECT * FROM leaderboard ORDER BY place DESC";
    $mysqliResult = $mysqli->query($query);

    // If there was a result...
    if ($mysqliResult) {
        $score = $_POST['score'];
        $outPut = $mysqliResult->fetch_array;
        //I got this code that loops through the results of the mysqli query from https://www.php.net/manual/en/mysqli-result.fetch-assoc.php
        while ($outPut = $mysqliResult->fetch_assoc()) {
            if(($score > $outPut['score']) && ($outPut['place'] < 11)){
                echo 'true';
                break;
            } 
            
        }
        $mysqliResult->free();
        $mysqliResult->close();
        $mysqli->close();
    }
    // Else, there was no result
    else {
        echo 'true';
        $mysqli->close();
    }
?>