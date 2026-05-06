<?php
declare(strict_types=1);

header('X-Content-Type-Options: nosniff');

function wants_json(): bool
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    return strpos($accept, 'application/json') !== false;
}

function respond(int $status, array $payload): never
{
    http_response_code($status);

    if (wants_json()) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    header('Content-Type: text/html; charset=utf-8');
    $title = $payload['ok'] ? 'Danke' : 'Fehler';
    $message = htmlspecialchars((string) $payload['message'], ENT_QUOTES, 'UTF-8');
    echo "<!doctype html><html lang=\"de\"><meta charset=\"utf-8\"><title>{$title}</title><body><p>{$message}</p><p><a href=\"index.html#contact\">Zurück</a></p></body></html>";
    exit;
}

function clean_header(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value) : strlen($value);
}

function starts_with(string $value, string $prefix): bool
{
    return strncmp($value, $prefix, strlen($prefix)) === 0;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'message' => 'Diese Seite nimmt nur Formular-Nachrichten entgegen.']);
}

$honeypot = trim((string) ($_POST['website'] ?? ''));
if ($honeypot !== '') {
    respond(200, ['ok' => true, 'message' => 'Danke, deine Nachricht wurde gesendet.']);
}

$name = trim(strip_tags((string) ($_POST['name'] ?? '')));
$emailRaw = trim((string) ($_POST['email'] ?? ''));
$email = filter_var($emailRaw, FILTER_VALIDATE_EMAIL);
$topic = trim(strip_tags((string) ($_POST['topic'] ?? 'Allgemeine Anfrage')));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || text_length($name) > 120) {
    respond(422, ['ok' => false, 'message' => 'Bitte gib deinen Namen an.']);
}

if ($email === false || text_length($emailRaw) > 180) {
    respond(422, ['ok' => false, 'message' => 'Bitte gib eine gültige E-Mail-Adresse an.']);
}

if ($message === '' || text_length($message) > 4000) {
    respond(422, ['ok' => false, 'message' => 'Bitte schreibe eine Nachricht mit maximal 4000 Zeichen.']);
}

$allowedTopics = [
    'Allgemeine Anfrage',
    'Community finden',
    'Eigene Gruppe starten',
    'Worship',
    'Podcast',
    'Einmalig spenden',
    'Regelmässig unterstützen',
    'Partner / Mäzen',
    'Impressum',
    'Datenschutz',
];

if (!in_array($topic, $allowedTopics, true) && !starts_with($topic, 'Community ')) {
    $topic = 'Allgemeine Anfrage';
}

$to = clean_header(getenv('SALTY_MAIL_TO') ?: 'info@saltysisters.eu');
$host = clean_header($_SERVER['SERVER_NAME'] ?? 'saltysisters.eu');
$subject = clean_header('[SALTY SISTERS] ' . $topic);
$replyTo = clean_header($name . ' <' . $email . '>');

$body = implode("\n", [
    'Neue Nachricht über die SALTY SISTERS Website',
    '',
    'Name: ' . $name,
    'E-Mail: ' . $email,
    'Thema: ' . $topic,
    '',
    'Nachricht:',
    $message,
    '',
    'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unbekannt'),
    'Zeit: ' . date('c'),
]);

$headers = [
    'From: SALTY SISTERS Website <no-reply@' . $host . '>',
    'Reply-To: ' . $replyTo,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    respond(500, [
        'ok' => false,
        'message' => 'Die Nachricht konnte nicht gesendet werden. Bitte schreibe direkt an info@saltysisters.eu.',
    ]);
}

respond(200, ['ok' => true, 'message' => 'Danke, deine Nachricht wurde gesendet.']);
