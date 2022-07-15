<?php
    $lab_members = getenv('LAB_MEMBERS');
    $lab_members = explode (",", $lab_members);
    echo json_encode($lab_members);
?>