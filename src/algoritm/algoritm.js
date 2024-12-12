import React, { useState } from 'react';

const AlgorithmPage = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(''); // Хранит текущий выбранный алгоритм
  const [selectedLanguage, setSelectedLanguage] = useState('js'); // Хранит выбранный язык программирования

  const algorithms = [
    { id: 'binarySearch', name: 'Бинарный поиск', description: 'Простой и быстрый метод поиска элемента.' },
    // Добавь другие алгоритмы
  ];

  const codeExamples = {
    js: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    cpp: `int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    java: `public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Левая часть: Блок-схема */}
      <div style={{ flex: '0 0 45%', borderRight: '1px solid #ccc', padding: '20px' }}>
        <h2>Алгоритмы</h2>
        <ul>
          {algorithms.map((alg) => (
            <li key={alg.id} onClick={() => setSelectedAlgorithm(alg.id)} style={{ cursor: 'pointer', margin: '10px 0' }}>
              {alg.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Правая часть: Описание и код */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        {/* Верхняя часть: Описание */}
        <div style={{ flex: '1', padding: '20px', borderBottom: '1px solid #ccc' }}>
          {selectedAlgorithm ? (
            <>
              <h3>{algorithms.find((alg) => alg.id === selectedAlgorithm)?.name}</h3>
              <p>{algorithms.find((alg) => alg.id === selectedAlgorithm)?.description}</p>
              <h4>Задачи:</h4>
              <ol>
                <li>Реализуйте алгоритм бинарного поиска для массива чисел.</li>
                <li>Найдите индекс числа 42 в массиве [1, 5, 8, 10, 42, 56, 89].</li>
              </ol>
            </>
          ) : (
            <p>Выберите алгоритм из списка слева.</p>
          )}
        </div>

        {/* Нижняя часть: Код */}
        <div style={{ flex: '1', padding: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            {['js', 'python', 'cpp', 'java'].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                style={{
                  marginRight: '10px',
                  padding: '5px 10px',
                  backgroundColor: selectedLanguage === lang ? '#007BFF' : '#f0f0f0',
                  color: selectedLanguage === lang ? '#fff' : '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px', overflowX: 'auto' }}>
            <code>{codeExamples[selectedLanguage]}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmPage;
