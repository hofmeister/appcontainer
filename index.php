<!DOCTYPE html>
<html>
<head>
	<title>App container demo</title>
    <style>
        body {
            width:750px;
            margin:50px auto;
            font-size: 18px;
            font-weight: 200;
            line-height: 30px;
        }

        body, h1 {
            font-family: 'Helvetica Neue';
        }

        h1 {
            font-weight: 100;
            font-size: 36px;
        }

        #info {
            margin-bottom: 35px;
        }

        .source {
            color: #0f2f72;
            font-weight: bold;
        }

        #apps {
            background-color: #efefef;
            padding:15px;
        }

    </style>
</head>
<body>

    <h1>App container demo</h1>
    <div id="info">
        <p>
            This is a proof of concept of a simpler app container, entirely defined in javascript and using CommonJS-like modules for dependency.
        </p>

        <p>
            This proof contains a single UI app, which in turn depends on an AngularJS Engine app that provides the UI app with angular.
            The important thing about that is that angular is something you opt into, and as such you could be opting into jQuery, Backbone etc.
        </p>

        <p>
            Note: This is not meant as a replacement, but merely a proff that it can be done, and done in ~100 kb - and thats not even gzipped.
        </p>

        <a class="source" href="https://github.com/hofmeister/appcontainer">View source on GitHub</a>
    </div>

    <div id="apps">

    </div>



    <script src="js/apps.js" type="text/javascript"></script>
    <? if (isset($_GET['bundle'])): ?>
        <? if (isset($_GET['minified'])): ?>
        <script src="bundle.js" type="text/javascript"></script>
    <? else: ?>
        <script src="bundle.php?id=AngularJS,Lib,HalloWorld" type="text/javascript"></script>
    <? endif; ?>
    <? else: ?>
        <script src="compiled.php?id=AngularJS" type="text/javascript"></script>
        <script src="compiled.php?id=Lib" type="text/javascript"></script>
        <script src="compiled.php?id=HalloWorld" type="text/javascript"></script>
    <? endif; ?>
    <script type="text/javascript">
        Apps.init();
    </script>

</body>
</html>