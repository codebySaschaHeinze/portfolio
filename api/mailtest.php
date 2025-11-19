<?php
$to      = 'kontakt@saschaheinze.de';
$from    = 'kontakt@saschaheinze.de';
$subject = 'Testmail von saschaheinze.de';
$body    = "Das ist ein einfacher Test.\n";

$headers = [
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'From: Testskript <' . $from . '>',
  'Reply-To: ' . $from,
  'X-Mailer: PHP/' . phpversion(),
];

$ok = mail($to, $subject, $body, implode("\r\n", $headers));

var_dump($ok);
