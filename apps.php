<?php

function traverse($dir,$callback) {
    if (!is_dir($dir)) return;
    $dh = opendir($dir);

    while($file = readdir($dh)) {
        if ($file[0] == '.') continue;

        $content = file_get_contents("$dir/$file");
        $callback( $file, $content );
    }

    closedir($dh);
}

function readCommonJS($path) {
    return wrapInCommonJS(file_get_contents($path));
}

function wrapInCommonJS($js) {
    $out =  "function ( module ) {\n\t\t".
        "//var window,parent,top,self,location,history,localStorage,locationbar,navigator,indexedDB,frames,frameElement,external,clientInformation,applicationCache,chrome;\n\n\t\t".
        str_replace("\n","\n\t\t",$js).
        "\n\t}";

    return str_replace("\t","    ",$out);
}

function compileApp( $appId ) {
    ob_start();
    $basePath = 'apps/'.$appId;
    $jsPath = "$basePath/js";
    $viewPath = "$basePath/views";
    $bootStrap = $basePath."/$appId.js";

    if (!is_dir($basePath)) {
        return;
    }

    $bootStrapContent = readCommonJs($bootStrap);
    ?>
    (function() {
    function require( moduleId, singleton ) {
    if (singleton) {
    return thisApp.singleton( moduleId );
    }
    return thisApp.module( moduleId);
    }

    function app( appId, version ) {
    return Apps.app( appId, version );
    }

    var thisApp = Apps.register('<?=$appId?>',<?=$bootStrapContent?>);
    <?

    //Read modules
    traverse($jsPath,function($filename, $contents) {

        list($moduleId) = explode('.',$filename);
        $contents = wrapInCommonJS($contents);

        ?>
        thisApp.module('<?=$moduleId?>',<?=$contents?>);
    <?
    });

    //Read views
    traverse($viewPath, function($filename, $contents) {

        ?>thisApp.view('<?=$filename?>','<?=urlencode($contents)?>');<?
    });
    ?>
    Object.freeze(thisApp);
    })();
<?
    return ob_get_clean();
}
