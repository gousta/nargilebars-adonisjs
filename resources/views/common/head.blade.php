<!DOCTYPE html>
<html>
<head>
    @if(isset($store['title']))
        <title>{{ $store['title'] or '' }} - Nargile Bars</title>
    @else
        <title>Nargile Bars</title>
    @endif

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">

    @if(isset($store['key']))
        <meta name="description" content="{{ $store['title'] or '' }}, {{ $store['address']['street'] or '' }}, {{ $store['area'] or '' }} - Nargile Bars" />
        <meta name="keywords" content="nargile,bar,cafe,shisha,hookah,{{ $store['key'] }}" />
    @else
        <meta name="description" content="Nargile Bars — Το πρώτο site εύρεσης και αξιολόγησης ναργιλέ καφέ-μπαρ είναι εδώ!" />
        <meta name="keywords" content="nargile,bar,cafe,shisha,hookah" />
    @endif
    
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/app.css">

    <!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

</head>
<body>

<div id="fb-root"></div>
<script>
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=222740607873509";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>
