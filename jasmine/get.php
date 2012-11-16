<?php
    $callback = $_GET['callback'];
    $a = $_GET['a'];
    echo $callback.'("'.$a.'")';
?>