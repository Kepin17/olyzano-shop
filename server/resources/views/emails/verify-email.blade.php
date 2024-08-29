<!DOCTYPE html>
<html>
<head>
    <title>Verify Your Email Address</title>
</head>
<body>
    <h1>Hello {{ $user->username }},</h1>
    <p>Please click the button below to verify your email address:</p>
    <a href="{{ $verificationUrl }}" style="display:inline-block;padding:10px 20px;font-size:16px;color:#fff;background-color:#007bff;text-decoration:none;border-radius:5px;">Verify Email</a>
    <p>If you did not create an account, no further action is required.</p>
</body>
</html>
