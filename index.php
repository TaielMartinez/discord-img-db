<?php
    $info = pathinfo($_FILES['userFile']['name']);
    $ext = $info['extension']; // get the extension of the file
    $newname = "newname.".$ext; 

    $target = $newname;
    move_uploaded_file( $_FILES['userFile']['tmp_name'], $target);
    $save = file_get_contents("http://storage.dakotaservers.com/publicar?ext="+$ext);
    echo $save;
    echo 'save';
?>
