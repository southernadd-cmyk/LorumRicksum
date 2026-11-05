<?php
/* Lorum Ricksum PHP backend, reconstructed from the original AJAX GET interface. */
header('Content-Type: text/html; charset=utf-8');
$path = __DIR__ . '/quotes.txt';
$quotes = is_readable($path) ? file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) : [];
$quotes = array_values(array_filter(array_map('trim', $quotes ?: [])));
if (!$quotes) { http_response_code(500); echo 'No dialogue data available'; exit; }
$tags = ($_GET['ptags'] ?? '') === 'p';
if (isset($_GET['words'])) { $mode='words'; $count=(int)$_GET['words']; }
elseif (isset($_GET['para'])) { $mode='para'; $count=(int)$_GET['para']; }
else { http_response_code(400); echo 'Specify words or para'; exit; }
$count=max(0,min(999,$count));
if (!$count) exit;
function randomQuote(array $quotes): string { return $quotes[random_int(0, count($quotes)-1)]; }
if ($mode === 'words') {
  $text='';
  while (str_word_count($text) < $count) {
    $text .= ($text ? ' ' : '') . randomQuote($quotes);
    if (strlen($text)>500000) break;
  }
  $words=preg_split('/\s+/u',trim($text));
  $out=implode(' ',array_slice($words,0,$count));
  echo $tags ? '<p>'.htmlspecialchars($out, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8').'</p>' : htmlspecialchars($out, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
} else {
  for ($i=0;$i<$count;$i++) {
    $lines=[];
    for($j=0,$n=random_int(4,7);$j<$n;$j++) $lines[]=randomQuote($quotes);
    $out=htmlspecialchars(implode(' ',$lines), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    echo $tags ? '<p>'.$out.'</p>' : ($out.($i==$count-1?'':"\n\n"));
  }
}
