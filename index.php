<!DOCTYPE html>
<html>
<head>
	<title>App container demo</title>
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



</head>
<body>

	<script type="text/javascript">
		Apps.init();
	</script>

</body>
</html>