<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/Exception.php';
require 'PHPMailer/SMTP.php';

// Получение значения полей из формы
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

$mail = new PHPMailer(true);

try {
    // Настройки сервера
    $mail->isSMTP();                                            // Использовать протокол SMTP
    $mail->Host       = 'smtp.yandex.ru';                       // SMTP сервер
    $mail->SMTPAuth   = true;                                   // Использовать SMTP аутентификацию
    $mail->Username   = 'masalov.andreey@yandex.ru';            // SMTP логин (включена галочка "С сервера imap.yandex.ru по протоколу IMAP" в "Все настройки -> Почтовые программы")
    $mail->Password   = 'rqqqufekztzyoioz';                     // SMTP пароль (пароль сгенерирован в "Все настройки -> Безопасность -> Пароли приложений")
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            // Использовать SSL шифрование
    $mail->Port       = 465;                                    // Использовать 465 TCP порт для SSL шифрования

    // Настройки получателей
    $mail->setFrom('masalov.andreey@yandex.ru', 'Pulse');       // От кого, Название письма
    $mail->addAddress('masalov.andreey@yandex.ru');             // Кому

    //Content
    $mail->isHTML(true);                                        // Использовать письма в формате HTML
    $mail->Subject = 'Новое обращение';                         // Тема письма и тело письма
    $mail->Body    = 'Имя: '.$name.'<br>                        
                      Телефон: '.$phone.'<br>
                      E-mail: '.$email;

    $mail->send();
    echo 'Письмо было отправлено';
} catch (Exception $e) {
    echo "Письмо не было отправлено. Mailer Error: {$mail->ErrorInfo}";
}
?>