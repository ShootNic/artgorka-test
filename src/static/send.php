<?php
if (!empty($_POST["email"]) && !empty($_POST["name"])){
    function send_mime_mail($name_from, // имя отправителя
                            $email_from, // email отправителя
                            $name_to, // имя получателя
                            $email_to, // email получателя
                            $data_charset, // кодировка переданных данных
                            $send_charset, // кодировка письма
                            $subject, // тема письма
                            $body, // текст письма
                            $html = true, // письмо в виде html или обычного текста
                            $reply_to = FALSE
    ) {
        $to = mime_header_encode($name_to, $data_charset, $send_charset)
            . ' <' . $email_to . '>';
        $subject = mime_header_encode($subject, $data_charset, $send_charset);
        $from =  mime_header_encode($name_from, $data_charset, $send_charset)
            .' <' . $email_from . '>';
        if($data_charset != $send_charset) {
            $body = iconv($data_charset, $send_charset, $body);
        }
        $headers = "From: $from\r\n";
        $type = ($html) ? 'html' : 'plain';
        $headers .= "Content-type: text/$type; charset=$send_charset\r\n";
        $headers .= "Mime-Version: 1.0\r\n";
        if ($reply_to) {
            $headers .= "Reply-To: $reply_to";
        }
        return mail($to, $subject, $body, $headers);
    }

    function mime_header_encode($str, $data_charset, $send_charset) {
        if($data_charset != $send_charset) {
            $str = iconv($data_charset, $send_charset, $str);
        }
        return '=?' . $send_charset . '?B?' . base64_encode($str) . '?=';
    }

    $email_array = array('support@test.ru');

    $date = date('d.m.Y H:i');
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $review = trim($_POST["review"]);

    $theme = "Отзыв с test.ru от ".$name;
    $message = "
Имя: $name<br>
E-mail: $email<br>
Дата отзыва: $date <br>
Отзыв: $review";

    foreach ($email_array as $email) {
        send_mime_mail("test",
            'no-reply@test.ru ',
            'Администратор',
            $email,
            'UTF-8',  // кодировка, в которой находятся передаваемые строки
            'UTF-8', // кодировка, в которой будет отправлено письмо
            $theme,
            $message);
    }

    echo json_encode(["status" => 'success']);
}
