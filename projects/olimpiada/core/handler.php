<?php

try {

  $input_members = (isset($_POST['members'])) ? explode(',', $_POST['members']) : [];

  if (!empty($input_members)) {
    $handler_output_data['members'] = [];
    foreach ($input_members as $input_member_index => $input_member_name) {
      if (!empty($input_member_name)) {
        if (preg_match('/^[а-яa-z\,]+$/iu', $input_member_name)) {
          array_push($handler_output_data['members'], [
            'id' => $input_member_index + 1,
            'name' => $input_member_name,
            'scores' => random_int(0, 100)
          ]);
        } else {
          $handler_message = sprintf('Невозможно добавить участника с именем "%s" - его имя не соотвуетствует формату.', $input_member_name);
        }
      }
    }

    $handler_message = (isset($handler_message)) ? $handler_message : 'Список участников получен.';
  } else {
    $handler_message = 'Невозможно обработать запрос, так как список участников пуст.';
  }

  $handler_status = (isset($handler_status)) ? $handler_status : 200;
  $handler_message = (isset($handler_message)) ? $handler_message : 'Обработчик обработал запрос, но не выдал результат.';

} catch (Exception $exception) {

  $handler_status = $exception->getCode();
  $handler_message = $exception->getMessage();

}

$handler_output_data = (isset($handler_output_data)) ? $handler_output_data : [];

echo json_encode([
  'status' => $handler_status,
  'message' => $handler_message,
  'outputData' => $handler_output_data,
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

?>