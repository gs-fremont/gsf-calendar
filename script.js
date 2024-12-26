
const csvUrls = {
  english: [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSi2gAvTMHzG_qazChse6NPFZDTKEFbJ5OgW1F5xEf5JjobUOEDUgurGZfghaLvbR8YbLgybuwtaK/pub?gid=1465302100&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSi2gAvTMHzG_qazChse6NPFZDTKEFbJ5OgW1F5xEf5JjobUOEDUgurGZfghaLvbR8YbLgybuwtaK/pub?gid=1102806551&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSi2gAvTMHzG_qazChse6NPFZDTKEFbJ5OgW1F5xEf5JjobUOEDUgurGZfghaLvbR8YbLgybuwtaK/pub?gid=1646285666&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSi2gAvTMHzG_qazChse6NPFZDTKEFbJ5OgW1F5xEf5JjobUOEDUgurGZfghaLvbR8YbLgybuwtaK/pub?gid=598018975&single=true&output=csv',
  ],
  punjabi: [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSi2gAvTMHzG_qazChse6NPFZDTKEFbJ5OgW1F5xEf5JjobUOEDUgurGZfghaLvbR8YbLgybuwtaK/pub?gid=1123996902&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSi2gAvTMHzG_qazChse6NPFZDTKEFbJ5OgW1F5xEf5JjobUOEDUgurGZfghaLvbR8YbLgybuwtaK/pub?gid=1674564694&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSi2gAvTMHzG_qazChse6NPFZDTKEFbJ5OgW1F5xEf5JjobUOEDUgurGZfghaLvbR8YbLgybuwtaK/pub?gid=763432794&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSi2gAvTMHzG_qazChse6NPFZDTKEFbJ5OgW1F5xEf5JjobUOEDUgurGZfghaLvbR8YbLgybuwtaK/pub?gid=1908107751&single=true&output=csv',
  ],
};

async function fetchAndDisplayCSV(url, container) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV from ${url}: ${response.statusText}`);
    }

    const csvText = await response.text();
    const rows = csvText.trim().split('\n').map(row => row.split(','));

    const table = document.createElement('table');

    // Add header
    const headerRow = document.createElement('tr');
    headerRow.className = 'header-row';
    const headerCell = document.createElement('td');
    headerCell.colSpan = 2;
    headerCell.textContent = rows[0][0];
    headerRow.appendChild(headerCell);
    table.appendChild(headerRow);

    // Add data rows
    rows.slice(1).forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell.trim();
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });

    container.appendChild(table);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function loadTables(language) {
  const container = document.getElementById('tables-container');
  container.innerHTML = '';

  for (const url of csvUrls[language]) {
    await fetchAndDisplayCSV(url, container);
  }
}

function switchLanguage(language) {
  document.querySelectorAll('.toggle-button').forEach(button => {
    button.classList.remove('selected');
  });

  document.getElementById(`${language}-button`).classList.add('selected');
  loadTables(language);
}

loadTables('english');