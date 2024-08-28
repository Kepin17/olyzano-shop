<!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
</head>
<body>
    <p>Hai {{ $user->username }},</p>
    <p>Untuk mereset password Anda, silakan klik tombol di bawah ini:</p>
    <a href="{{ $resetUrl }}">Reset Password</a>
</body>
</html>
