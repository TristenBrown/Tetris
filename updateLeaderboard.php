<?php
    // Require the credentials
    require_once 'db.conf';
    // Connect to the database
    $mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

    // Check for errors
    if ($mysqli->connect_error) {
        $error = 'Error: ' . $mysqli->connect_errno . ' ' . $mysqli->connect_error;
        echo $error;
        exit;
    }
    $query = "SELECT * FROM leaderboard ORDER BY place ASC";
    $mysqliResult = $mysqli->query($query);

    $score = $_POST['score'];
    $name = $_POST['userName'];
    // If there was a result...
    if ($mysqliResult) {
        $outPut = $mysqliResult->fetch_assoc();
        //I got this code that loops through the results of the mysqli query from https://www.php.net/manual/en/mysqli-result.fetch-assoc.php
        if($outPut){ 
            do{
                if($score > $outPut['score']){
                    $newPut = $outPut;
                    do{
                        $query = "UPDATE leaderboard SET place = " . ($outPut['place'] + 1) . " WHERE place = " . $outPut['place'] . " AND name = '" . $outPut['name'] . "'";
                        $mysqli->query($query);
                        echo $query;
                    }
                    while($outPut = $mysqliResult->fetch_assoc());
                    $query = "INSERT INTO leaderboard VALUES (" . $newPut['place'] . ", '" . $name . "', " . $score . ")";
                    $mysqli->query($query);
                    echo $query;
                    break;
    //                $mysqli->query($query);
    //                $query = "INSERT INTO leaderboard VALUES (" . ($outPut['place'] + 1) . ", " . $name . ", " . $score . ")";
    //                $mysqli->query($query);
    //                while ($outPut = $mysqliResult->fetch_assoc()) {
    //                    if($outPut['place'] + 1 >= 11){
    //                        $query = "DELETE FROM leaderboard WHERE place = "  . $outPut['place'] . "AND name = " . $outPut['name'];
    //                    }
    //                    else{
    //                        $query = "UPDATE leaderboard SET place = " . ($outPut['place'] + 1) . "WHERE place = " . $outPut['place'] . "AND name = " . $outPut['name'];
    //                    }
    //                    $mysqli->query($query);
    //                }
                }
            }
            while ($outPut = $mysqliResult->fetch_assoc());
        }
        else{
            $query = "INSERT INTO leaderboard VALUES (1, '" . $name . "', " . $score . ")";
            echo $query;
            $mysqli->query($query);
        }
        $mysqliResult->free();
        $mysqliResult->close();
        $mysqli->close();
    }
    // Else, there was no result
    else {
        exit;
    }
?>