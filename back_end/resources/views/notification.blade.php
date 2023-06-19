<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style>
        body {
            display: flex;
            width: 90vw;
            justify-content: center;
            margin-top: 25px;
            font-family: 'Jost', sans-serif;
            background-color: #293140;
            color: white;
        }

        .logoR {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .logoR img {
            width: 100%;
        }

        .logo {
            width: 120px;
        }

        h3 {
            text-align: center
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 14px;
        }
    </style>
    <title>Document</title>
</head>
@php
    $contents = Storage::disk('public')->get('images/vallogo.png');
    $base64 = base64_encode($contents);
@endphp

<body>
    <div class="container">
        <div class="logoR">
            <div class="logo">
                <img src={{ "data:image/png;base64,$base64" }} alt="#">
            </div>
            <h3>WELCOME TO VAL BANK</h3>
        </div>

        <h4>YOU ADDED AUTO PAY</h4>

        <small>CONTACT SUPPORT IF THERE'S A PROBLEM</small>
    </div>
</body>

</html>
