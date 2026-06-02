<?php
header('Content-Type: application/json; charset=utf-8');
header('Referrer-Policy: no-referrer');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok'=>false,'error'=>'method_not_allowed']);
  exit;
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host   = $_SERVER['HTTP_HOST'] ?? '';
if ($origin && parse_url($origin, PHP_URL_HOST) === $host) {
  header("Access-Control-Allow-Origin: $origin");
}

$ip   = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$rate = sys_get_temp_dir() . '/cf_' . md5($ip);

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!$data) {
  $data = $_POST;
}

$name  = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$msg   = trim($data['message'] ?? '');

if ($name === '' || $email === '' || $msg === '') {
  http_response_code(400);
  echo json_encode(['ok'=>false,'error'=>'missing']);
  exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok'=>false,'error'=>'email']);
  exit;
}

if (file_exists($rate) && (time() - filemtime($rate)) < 30) {
  http_response_code(429);
  echo json_encode(['ok'=>false,'error'=>'too_many_requests']);
  exit;
}
touch($rate);

$to      = 'kontakt@saschaheinze.de';        
$from    = 'kontakt@saschaheinze.de';        
$subject = 'Neue Kontaktanfrage von ' . $name;

$body = "Name: $name\n"
      . "E-Mail: $email\n"
      . "IP: $ip\n\n"
      . "Nachricht:\n$msg\n";

$headers = [
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'From: Portfolio Kontakt <' . $from . '>',
  'Reply-To: ' . $email,
  'X-Mailer: PHP/' . phpversion(),
];

$ok = mail(
  $to,
  '=?UTF-8?B?'.base64_encode($subject).'?=',
  $body,
  implode("\r\n", $headers)
);

if ($ok) {
  echo json_encode(['ok'=>true]);
} else {
  error_log('Mail send failed in contact.php: ' . print_r(error_get_last(), true));
  http_response_code(500);
  echo json_encode(['ok'=>false,'error'=>'send_failed']);
}
