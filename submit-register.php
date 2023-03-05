<?php
$username = $_POST['username'];
$body = $_POST['body'];
$mouth = $_POST['mouth'];
$eyes = $_POST['eyes'];

setcookie('username', $username, time() + 10 * 365 * 24 * 60 * 60, '/');
setcookie('body', $body, time() + 10 * 365 * 24 * 60 * 60, '/');
setcookie('mouth', $mouth, time() + 10 * 365 * 24 * 60 * 60, '/');
setcookie('logged-in', true, time() + 60 * 60, '/');
setcookie('eyes', $eyes, time() + 10 * 365 * 24 * 60 * 60, '/');


header('Location: index.php');
?>