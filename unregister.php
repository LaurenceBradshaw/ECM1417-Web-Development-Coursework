<?php
setcookie('logged-in', '', time() - 1, '/');
session_start();
$_SESSION["registered"] = false;
header('Location: index.php');
?>