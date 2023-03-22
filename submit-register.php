<?php
$username = $_POST['username'];
$body = $_POST['skin'];
$mouth = $_POST['mouth'];
$eyes = $_POST['eyes'];
$_SESSION["registered"] = true;

setcookie('username', $username, time() + 10 * 365 * 24 * 60 * 60, '/');
setcookie('skin', $body, time() + 10 * 365 * 24 * 60 * 60, '/');
setcookie('mouth', $mouth, time() + 10 * 365 * 24 * 60 * 60, '/');
setcookie('logged-in', true, time() + 60 * 60, '/');
setcookie('eyes', $eyes, time() + 10 * 365 * 24 * 60 * 60, '/');
setcookie('max_score', -1, time() + 10 * 365 * 24 * 60 * 60, '/');


header('Location: index.php');
?>