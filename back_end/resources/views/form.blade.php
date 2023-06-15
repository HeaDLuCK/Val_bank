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

        .container a {
            text-decoration: none;
            padding: 18px;
            width: 190px;
            border: none;
            cursor: pointer;
            border-radius: 8px;
            background-color: white;
            color: #293140;
            font-size: 16px;
            font-weight: 600;
            display: block;
            text-align: center;
            transition: background-color 550ms, color 550ms;
        }

        .container a:hover {
            background-color: #5b719b;
            color: white;
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

        <div>CLICK TO RESET YOUR PASSWORD</div>

        <div>
            <a href={{ "http://localhost:3000/reset-password/$token" }}>RESET PASSWORD</a>
        </div>
    </div>
</body>

</html>
