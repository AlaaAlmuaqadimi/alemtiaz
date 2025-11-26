<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name    = $_POST['name'] ?? '';
    $email   = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? 'لا موضوع';
    $message = $_POST['message'] ?? '';

    // عدّل هذه لاحقاً لإيميلك الحقيقي
    $to   = "x@example.com";
    $from = "x@example.com";

    $headers  = "From: $from\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $body =
        "الاسم: $name\n" .
        "البريد الإلكتروني: $email\n" .
        "الموضوع: $subject\n\n" .
        "الرسالة:\n$message";

    if (mail($to, $subject, $body, $headers)) {
        echo "نجحت";
    } else {
        echo "حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة لاحقاً.";
    }
}
?>
