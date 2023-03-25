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
setcookie('1', -1, time() + 10 * 365 * 24 * 60 * 60, '/');
setcookie('2', -1, time() + 10 * 365 * 24 * 60 * 60, '/');
setcookie('3', -1, time() + 10 * 365 * 24 * 60 * 60, '/');
setcookie('4', -1, time() + 10 * 365 * 24 * 60 * 60, '/');
setcookie('5', -1, time() + 10 * 365 * 24 * 60 * 60, '/');
setcookie('6', -1, time() + 10 * 365 * 24 * 60 * 60, '/');
setcookie('total', -1, time() + 10 * 365 * 24 * 60 * 60, '/');


header('Location: index.php');
?>