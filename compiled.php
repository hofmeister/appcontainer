<?php
require 'apps.php';

header('Content-type: text/javascript');

echo compileApp($_GET['id']);


