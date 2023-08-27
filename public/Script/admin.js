
document.addEventListener("DOMContentLoaded", table_4knr9i_load_content);
var table_4knr9i_data = null;

window.table_4knr9i_load_content = table_4knr9i_load_content;

function table_4knr9i_load_content(e, visableColumns = null, searchableColumns = null) {
    let content = document.getElementById("table_4knr9i__sheetdb_content");
    if (!content) {
        return null;
    }

    let appContent = document.getElementById("table_4knr9i__table_content");
    let loader = document.getElementById("table_4knr9i__loader");
    let apiUrl = content.dataset.apiUrl;
    let errorNode = document.getElementById("table_4knr9i_snippet_error");
    
    appContent.style.display = 'none';
    
    loader.style.display = 'block';
    if (!visableColumns) {
        visableColumns = JSON.parse('[\"name\",\"email\",\"message\"]');
    } if (!searchableColumns) {
        searchableColumns = JSON.parse('[\"name\",\"email\",\"message\"]');
    } if (table_4knr9i_data) {
        table_4knr9i_data.forEach((row) => {
            let rowNode = document.createElement('tr');
            visableColumns.forEach((column) => {
                let colNode = document.createElement('td');
                colNode.innerHTML = row[column];
                colNode.dataset.label = column;
                colNode.dataset.searchable = searchableColumns.includes(column) ? "true" : "false";
                rowNode.appendChild(colNode);
            });
            content.appendChild(rowNode);
            appContent.style.display = '';
            loader.style.display = 'none';
        }); return;
    } if (apiUrl) {
        content.innerHTML = '';
        fetch(apiUrl).then((response) => {
            if (response.status !== 200) {
                loader.style.display = 'none';
                errorNode.style.display = 'flex';
                return false;
            } return response.json();
        }).then((data) => {
            if (!data) {
                loader.style.display = 'none';
                errorNode.style.display = 'flex';
            }
            table_4knr9i_data = data; data.forEach((row) => {
                let rowNode = document.createElement('tr');
                visableColumns.forEach((column) => {
                    let colNode = document.createElement('td');
                    colNode.innerHTML = row[column];
                    colNode.dataset.label = column;
                    colNode.dataset.searchable = searchableColumns.includes(column) ? "true" : "false";
                    rowNode.appendChild(colNode);
                });
                content.appendChild(rowNode);
                appContent.style.display = '';
                loader.style.display = 'none';
            });
        });
    }
}
window.table_4knr9i_sort_table = table_4knr9i_sort_table;
function table_4knr9i_sort_table(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table_4knr9i__table");
    switching = true;
    dir = "asc"; while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false; x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (!x || !y) {
                continue;
            }
            let xVal = parseInt(x.innerHTML.toLowerCase());
            let yVal = parseInt(y.innerHTML.toLowerCase());
            if (isNaN(xVal)) {
                xVal = x.innerHTML.toLowerCase();
            }
            if (isNaN(yVal)) {
                yVal = y.innerHTML.toLowerCase();
            }
            if (dir == "asc") {
                if (xVal > yVal) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (xVal < yVal) {
                    shouldSwitch = true;
                    break;
                }
            }
        } if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
window.table_4knr9i_form_search_change = table_4knr9i_form_search_change;
function table_4knr9i_form_search_change() {
    var input, filter, table, tr, td, cell, i, j, count, no_results;
    nput = document.getElementById("table_4knr9i_form_search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table_4knr9i__table");
    tr = table.getElementsByTagName("tr");
    no_results = document.getElementById("table_4knr9i__no_results_found");
    count = 0;
    for (i = 1; i < (tr.length - 1); i++) {
        tr[i].style.display = "none";
        td = tr[i].getElementsByTagName("td");
        for (var j = 0; j < td.length; j++) {
            if (td[j].dataset.searchable == "false") {
                continue;
            }
            cell = tr[i].getElementsByTagName("td")[j]; if (cell) {
                if (cell.innerText.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    count++; break;
                }
            }
        }
    } if (count === 0) {
        no_results.style.display = "table - row";
    } else {
        no_results.style.display = "none";
    }
}