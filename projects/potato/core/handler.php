<?php

try {

  $input_name = (isset($_POST['client_name'])) ? explode(',', $_POST['client_name']) : '';
  $input_phone = (isset($_POST['client_tel'])) ? explode(',', $_POST['client_tel']) : '';

  if (!empty($input_name) && !empty($input_phone)) {
    $handler_output_data = [
      'client_name' => $input_name,
      'client_phone' => $input_phone
    ];
    $handler_message = 'Данные по заявке получены.';
  } else {
    $handler_message = 'Невозможно обработать запрос, так как некоторые поля не заполнены.';
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