<?php
session_start();
$_SESSION["registered"] = false;
header('Location: index.php');
?>