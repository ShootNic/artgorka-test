<?php
$dir    = '.';
$files = scandir($dir);

foreach ($files as $file) {
  $ext = pathinfo($file, PATHINFO_EXTENSION);
    if ($ext=='html') {
        echo('<p style="margin: 0;"><a href="'.$file.'" target="_blank"> -> '.$file.'</a></p>');
    }
}
