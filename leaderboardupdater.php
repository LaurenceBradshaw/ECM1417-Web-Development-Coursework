<?php
error_reporting(-1);
ini_set('display_errors', 'On');

session_start();

$path = "/var/www/html/data/" . strval($_POST['level']) . ".txt";

$reading = fopen($path, "r") or die("Unable to open file");
$writing = "";

$exists = false;
while(!feof($reading)) {
    $line = fgets($reading);
    if(!$line == ""){
        // Data is in the following format
        // USERNAME-SKIN-EYES-MOUTH-SCORE-TIME
        $data = explode('-', $line);
        if($data[0] == $_COOKIE['username']){
            $exists = true;
        }
        if($data[0] == $_COOKIE['username'] & (int)$data[4] <= (int)$_POST['score']){
            $writing = $writing . $data[0] . "-" . $data[1] . "-" . $data[2] . "-" . $data[3] . "-" . $_POST['score'] . "-" . $_POST['time']  . "\n";
        } else {
            $writing = $writing . $line;
        }
    }
}
if(!$exists){
    $writing = $writing . $_COOKIE['username'] . "-" . $_COOKIE['skin'] . "-" . $_COOKIE['eyes'] . "-" . $_COOKIE['mouth'] . "-" . $_POST['score'] . "-" . $_POST['time'] . "\n";
}
fclose($reading);

$newFile = fopen($path, "w") or die("Unable to open file!");
fwrite($newFile, $writing);
fclose($newFile);

?>