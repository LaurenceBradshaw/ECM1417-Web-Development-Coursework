<?php
error_reporting(-1);
ini_set('display_errors', 'On');

session_start();

$path = "/var/www/html/data/leaderboard.txt";

$reading = fopen($path, "r") or die("Unable to open file!");
$writing = "";

$exists = false;
while(!feof($reading)) {
    $line = fgets($reading);
    if(!$line == ""){
        // Data is in the following format
        // USERNAME-SKIN-EYES-MOUTH-LEVEL-SCORE
        $data = explode('-', $line);
        if($data[0] == $_COOKIE['username'] && $data[4] == $_POST['level']){
            $newLine = $data[0] . "-" . $data[1] . "-" . $data[2] . "-" . $data[3] . "-" . $data[4] . "-" . $_POST['score'] . "\n";
            $exists = true;
        } else {
            $writing = $writing . $line . "\n";
        }
    }
}
if(!$exists){
    $writing = $writing . $_COOKIE['username'] . "-" . $_COOKIE['skin'] . "-" . $_COOKIE['eyes'] . "-" . $_COOKIE['mouth'] . "-" . $_POST['level'] . "-" . $_POST['score'] . "\n";
}
fclose($reading);

$newFile = fopen($path, "w") or die("Unable to open file!");
fwrite($newFile, $writing);
fclose($newFile);

?>