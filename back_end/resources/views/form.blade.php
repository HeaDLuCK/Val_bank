<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <form action="{{ Route('register') }}" method="post" enctype="multipart/form-data">
        @csrf
        <div>
            <input name="username" type="text">
        </div>
        <div>
            <input name="password" type="password">
        </div>
        <div>
            <input name="password_confirmation" type="password">
        </div>
        <div>
            <input name="first_name" type="text">
        </div>
        <div>
            <input name="last_name" type="text">
        </div>
        <div>
            <input name="birthday" type="date">
        </div>
        <div>
            <input name="cin" type="text">
        </div>
        <div>
            <input name="email" type="email">
        </div>
        <div>
            <input name="phone_number" type="tel">
        </div>
        <div>
            <input name="address" type="text">
        </div>
        <div>
            <input name="avatar_image" type="file">
        </div>
        <div>
            {{-- <img src="data:image/png;base64,{{ $data }}" alt="#"> --}}
        </div>
        <button type="submit">SUBMIT</button>
    </form>
</body>

</html>
