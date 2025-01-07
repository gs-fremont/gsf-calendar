
const csvUrls = {
  english: [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTc5RkM1l70DjJC13Hr3S8sXNm6fKcOpJdDo4vg0WvmmXRfrYxY3Q6XQNH4ltmM_Jh8hstlPmW5NPA7/pub?gid=0&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTc5RkM1l70DjJC13Hr3S8sXNm6fKcOpJdDo4vg0WvmmXRfrYxY3Q6XQNH4ltmM_Jh8hstlPmW5NPA7/pub?gid=505204058&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTc5RkM1l70DjJC13Hr3S8sXNm6fKcOpJdDo4vg0WvmmXRfrYxY3Q6XQNH4ltmM_Jh8hstlPmW5NPA7/pub?gid=496992164&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTc5RkM1l70DjJC13Hr3S8sXNm6fKcOpJdDo4vg0WvmmXRfrYxY3Q6XQNH4ltmM_Jh8hstlPmW5NPA7/pub?gid=1933166340&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTc5RkM1l70DjJC13Hr3S8sXNm6fKcOpJdDo4vg0WvmmXRfrYxY3Q6XQNH4ltmM_Jh8hstlPmW5NPA7/pub?gid=1137886951&single=true&output=csv',
  ],
  punjabi: [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTc5RkM1l70DjJC13Hr3S8sXNm6fKcOpJdDo4vg0WvmmXRfrYxY3Q6XQNH4ltmM_Jh8hstlPmW5NPA7/pub?gid=1335764588&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTc5RkM1l70DjJC13Hr3S8sXNm6fKcOpJdDo4vg0WvmmXRfrYxY3Q6XQNH4ltmM_Jh8hstlPmW5NPA7/pub?gid=386898595&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTc5RkM1l70DjJC13Hr3S8sXNm6fKcOpJdDo4vg0WvmmXRfrYxY3Q6XQNH4ltmM_Jh8hstlPmW5NPA7/pub?gid=22693599&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTc5RkM1l70DjJC13Hr3S8sXNm6fKcOpJdDo4vg0WvmmXRfrYxY3Q6XQNH4ltmM_Jh8hstlPmW5NPA7/pub?gid=84556561&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTc5RkM1l70DjJC13Hr3S8sXNm6fKcOpJdDo4vg0WvmmXRfrYxY3Q6XQNH4ltmM_Jh8hstlPmW5NPA7/pub?gid=285271324&single=true&output=csv',
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
    const columnCount = rows[1]?.length || 2; // Get the number of columns (default to 2)
    headerCell.colSpan = columnCount; // Merge cells based on column count
    //headerCell.colSpan = 2;
    headerCell.textContent = rows[0][0];
    headerRow.appendChild(headerCell);
    table.appendChild(headerRow);

    // Add data rows
    rows.slice(1).forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell.trim();
        td.style.fontSize = '0.8em';  // Add font size
        td.style.fontWeight = 'bold'; // Add bold
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