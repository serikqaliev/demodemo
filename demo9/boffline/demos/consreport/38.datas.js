
var g_data1 = 
[
  { id: '0', parent: '', name: 'Все время', color: '#e0e0e0' },
  { id: '1', parent: '0', name: 'Нерабочее', value: 54000, color: '#c0c0c0' },
  { id: '2', parent: '0', name: 'Время на работе', color: '#4191a2' },
  { id: '3', parent: '0', name: 'Недоработанное', value: 3600, color: '#f02020', sliced: true },
  { id: '4', parent: '2', name: 'Активное', color: '#21c95c' },
  { id: '5', parent: '2', name: 'Неактивное', value: 16800, color: '#c65c66' },
  { id: '6', parent: '4', name: 'Программы', value: 3000, color: '#e5d126' },
  { id: '7', parent: '4', name: 'Сайты', value: 8000, color: '#5070d0' },
  { id: '8', parent: '4', name: 'Фон', value: 1000, color: '#f8f8f8' }
];


var g_data2 = 
[
  { id: '0', parent: '', name: 'Активное время', color: '#21c95c', noTooltip: true },
  { id: '1', parent: '0', name: 'Приложения и сайты', value: 0.5, color: '#d2ca40', noTooltip: true },

  { id: null, parent: '0', name: '-', value: 0.008, noTooltip: true, color: 'transparent', borderColor: 'transparent',
    dataLabels: { filter: { property: 'outerArcLength', operator: '>', value: 1000000 } } },

  { id: '2', parent: '0', name: 'Возможные риски', value: 0.15, color: '#f19611', sliced: true, noTooltip: true },

  { id: null, parent: '0', name: '-', value: 0.008, noTooltip: true, color: 'transparent', borderColor: 'transparent',
    dataLabels: { filter: { property: 'outerArcLength', operator: '>', value: 1000000 } } },
  
  { id: '3', parent: '1', name: 'Соц. сети' },
  { id: '4', parent: '1', name: 'Рабочие', color: '#1c99e1', sliced: true },
  { id: '5', parent: '1', name: 'Развлечения' },
  { id: '6', parent: '1', name: 'СМИ' },
  { id: '7', parent: '1', name: 'Поиск работы' },
  { id: '8', parent: '1', name: 'Файлообменники' },
  { id: '9', parent: '1', name: 'Фильмы и ТВ' },
  { id: '10', parent: '1', name: 'Прочее', color: '#c0c0c0' },
  { id: '11', parent: '2', name: 'Печать (11)', value: 11, color: '#769aae', sliced: true, isNumeric: true },
  { id: '12', parent: '2', name: 'Отправка файлов (17)', value: 17, color: '#ae76a0', sliced: true, isNumeric: true },
  { id: '13', parent: '2', name: 'События (22)', color: '#c82c3b', sliced: true, isNumeric: true },
  { id: '16', parent: '13', name: 'Приоритетные (7)', value: 7, color: '#c82cb4', isNumeric: true },
  { id: '17', parent: '13', name: 'Обычные (15)', value: 15, color: '#967592', isNumeric: true },
  { id: null, parent: '3', name: 'facebook.com', value: 2100 },
  { id: null, parent: '3', name: 'web.telegram.org', value: 1000 },
  { id: null, parent: '3', name: 'odnoklassniki.ru', value: 500 },
  { id: null, parent: '3', name: 'vk.com', value: 2200 },
  { id: null, parent: '3', name: 'instagram.com', value: 1200 },
  { id: null, parent: '4', name: 'Winword', value: 600 },
  { id: null, parent: '5', name: 'youtube.com', value: 500 },
  { id: null, parent: '5', name: 'rutube.ru', value: 800 },
  { id: null, parent: '5', name: 'tnt-online.ru', value: 500 },
  { id: null, parent: '6', name: 'korrespondent.net', value: 900 },
  { id: null, parent: '6', name: 'rbc.ru', value: 500 },
  { id: null, parent: '6', name: 'meduza.io', value: 600 },
  { id: null, parent: '7', name: 'hh.ru', value: 900 },
  { id: null, parent: '7', name: 'freelance.ru', value: 1900 },
  { id: null, parent: '7', name: 'job.ua', value: 800 },
  { id: null, parent: '8', name: 'dropbox.com', value: 300 },
  { id: null, parent: '8', name: 'drive.google.com', value: 350 },
  { id: null, parent: '9', name: 'films.tv', value: 1300 },
  { id: null, parent: '9', name: 'movies.com', value: 1000 },
  { id: null, parent: '10', name: 'Photoshop', value: 300 },
  { id: null, parent: '10', name: 'Autodesk Autocad', value: 700 },
  { id: null, parent: '10', name: 'tutu.ru', value: 700 },
  { id: null, parent: '10', name: 'microsoft.ru', value: 400 },
  { id: null, parent: '10', name: 'nalog.ru', value: 200 },
  { id: null, parent: '4', name: 'Microsoft Excel', value: 900 },
  { id: null, parent: '4', name: 'Powerpoint', value: 300 },
  { id: null, parent: '4', name: 'Microsoft Visual C++', value: 1000 },
  { id: null, parent: '4', name: '192.168.100.1', value: 1350 },
  { id: null, parent: '10', name: 'google.ru', value: 700 }
 

];

