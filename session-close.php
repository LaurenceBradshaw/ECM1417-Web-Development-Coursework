<?php
function logout(){
    setcookie('logged-in', false, time() - 1);
}
?>